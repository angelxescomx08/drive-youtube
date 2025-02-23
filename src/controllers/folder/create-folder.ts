import { LibsqlError } from '@libsql/client';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { folder } from '../../db/schema';
import { createFolderSchema } from '../../types/folder';

export const createFolderController = async (req: Request, res: Response) => {
	try {
		const { id_parent, id_user, folder_name } = req.body;

		const validateFields = createFolderSchema.safeParse({
			id_parent,
			id_user,
			folder_name,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const result = await db
			.insert(folder)
			.values({
				id_folder: crypto.randomUUID(),
				id_user,
				id_parent,
				folder_name,
			})
			.returning({
				id_folder: folder.id_folder,
				id_user: folder.id_user,
				id_parent: folder.id_parent,
				folder_name: folder.folder_name,
			});

		res.json({
			message: 'Folder created',
			folder: result.at(0),
		});
	} catch (error) {
		if (error instanceof LibsqlError) {
			return res.status(500).json({
				message: error.message,
				error,
			});
		}
		res.status(500).json({
			message: 'Something wrong happen unfortunately',
			error,
		});
	}
};
