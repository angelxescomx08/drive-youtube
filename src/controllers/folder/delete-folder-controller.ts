import { LibsqlError } from '@libsql/client';
import type { Request, Response } from 'express';
import { folderContentSchema } from '../../types/folder';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { folder } from '../../db/schema';

export const deleteFolderController = async (req: Request, res: Response) => {
	try {
		const { id_folder } = req.params;

		const validateFields = folderContentSchema.safeParse({
			id_folder,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const result = await db
			.delete(folder)
			.where(eq(folder.id_folder, id_folder))
			.returning({
				id_folder: folder.id_folder,
				id_parent: folder.id_parent,
				id_user: folder.id_user,
				folder_name: folder.folder_name,
			});

		res.status(200).json({
			message: 'Deleted successfully',
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
