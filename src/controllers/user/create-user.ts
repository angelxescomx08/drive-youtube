import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { user } from '../../db/schema';
import { createUserSchema } from '../../types/user';

export const createUserController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const validateFields = createUserSchema.safeParse({
			email,
			password,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const hashPassword = bcrypt.hashSync(password);

		const result = await db
			.insert(user)
			.values({
				email,
				id_user: crypto.randomUUID(),
				password: hashPassword,
			})
			.returning({
				email: user.email,
				id_user: user.id_user,
			});

		res.json({
			message: 'User created',
			user: result.at(0),
		});
	} catch (error) {
		if ((error as any)?.libsqlError) {
			return res.status(500).json({
				message: 'Email already taken',
				error,
			});
		}
		res.status(500).json({
			message: 'Something wrong happen unfortunately',
			error,
		});
	}
};
