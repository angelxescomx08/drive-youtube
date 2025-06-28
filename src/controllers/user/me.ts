import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { user } from '../../db/schema';
import { userJWTPayload } from '../../types/user';
import { envs } from '../../config/env';
import jwt from 'jsonwebtoken';

export const meController = async (req: Request, res: Response) => {
  try {
    const auth_token = req.headers.auth_token as string;

    const userPayload: userJWTPayload = jwt.verify(
      auth_token,
      envs.SECRET_PASSWORD_KEY,
    ) as userJWTPayload;

    const result = await db.query.user.findFirst({
      where: eq(user.id_user, userPayload.id_user),
      columns: {
        id_user: true,
        email: true,
      }
    });

    return res.json({
      message: 'User found',
      user: result,
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
