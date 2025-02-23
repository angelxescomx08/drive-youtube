import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { user } from '../../db/schema';
import { createUserSchema } from '../../types/user';
import { signToken } from '../../utils/token';

export const loginController = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const validFields = createUserSchema.safeParse({
			email,
			password,
		});
		if (!validFields.success) {
			return res.status(400).json({
				message: 'Not valid credentials',
				error: validFields.error,
			});
		}
		const result = await db.query.user.findFirst({
			where: eq(user.email, email),
		});

		if (!result) {
			return res.status(400).json({
				message: 'Not valid credentials',
				error: 'Not valid credentials',
			});
		}

		const { id_user, password: hash } = result;
		const valid = bcrypt.compareSync(password, hash);

		if (!valid) {
			return res.status(400).json({
				message: 'Not valid credentials',
				error: 'Not valid credentials',
			});
		}

		const token = signToken(id_user, email);

		return res.json({
			message: 'Welcomed',
			token,
			user: {
				id_user,
				email,
			},
		});
	} catch (error) {
		res.status(500).json({
			message: 'Something wrong happen unfortunately',
			error,
		});
	}
};
