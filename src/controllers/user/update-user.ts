import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { user } from '../../db/schema';
import { updateUserSchema } from '../../types/user';

export const updateUserController = async (req: Request, res: Response) => {
	try {
		const { id_user } = req.params;
		const { password, email } = req.body;

		const validFields = updateUserSchema.safeParse({
			id_user,
			email,
			password,
		});
		if (!validFields.success) {
			return res.json({
				message: 'Not valid data',
				error: validFields.error,
			});
		}

		let hashPassword: undefined | string = undefined;
		if (password) {
			hashPassword = bcrypt.hashSync(password);
		}

		const result = await db
			.update(user)
			.set({
				email,
				password: hashPassword,
			})
			.where(eq(user.id_user, id_user))
			.returning({
				id_user: user.id_user,
				email: user.email,
			});

		res.json({
			message: 'User updated',
			user: result.at(0),
		});
	} catch (error) {
		if ((error as any)?.libsqlError) {
			return res.status(500).json({
				message: error,
				error,
			});
		}
		res.status(500).json({
			message: 'Something wrong happen unfortunately',
			error,
		});
	}
};
