import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { envs } from '../config/env';

export const signToken = (id_user: string, email: string) => {
	const token = jwt.sign(
		{
			id_user,
			email,
		},
		envs.SECRET_PASSWORD_KEY,
		{
			expiresIn: '2w',
		},
	);
	return token;
};

export const verifyToken = (token: string) => {
	try {
		jwt.verify(token, envs.SECRET_PASSWORD_KEY);
		return true;
	} catch (error) {
		return false;
	}
};
