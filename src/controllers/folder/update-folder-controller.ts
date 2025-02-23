import { LibsqlError } from '@libsql/client';
import type { Request, Response } from 'express';
import { updateFolderSchema } from '../../types/folder';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { folder } from '../../db/schema';

export const updateFolderController = async (req: Request, res: Response) => {
	try {
		const { id_folder } = req.params;
		const { folder_name, id_parent } = req.body;

		const validateFields = updateFolderSchema.safeParse({
			id_folder,
			folder_name,
			id_parent,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const folder_to_update = await db.query.folder.findFirst({
			where: eq(folder.id_folder, id_folder),
		});

		if (!folder_to_update) {
			return res.status(400).json({
				message: 'There is not any folder with that id',
				error: 'There is not any folder with that id',
			});
		}

		const update_folder = await db
			.update(folder)
			.set({
				folder_name,
				id_parent,
			})
			.where(eq(folder.id_folder, id_folder))
			.returning({
				id_folder: folder.id_folder,
				id_parent: folder.id_parent,
				id_user: folder.id_user,
				folder_name: folder.folder_name,
			});

		res.status(200).json({
			message: 'Query successful',
			folder: update_folder.at(0),
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
