import { LibsqlError } from '@libsql/client';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { file } from '../../db/schema';
import { updateFileSchema } from '../../types/file';

export const updateFileController = async (req: Request, res: Response) => {
	try {
		const { id_file } = req.params;
		const { id_folder, file_name } = req.body;

		const validateFields = updateFileSchema.safeParse({
			id_file,
			id_folder,
			file_name,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const fileToUpdate = await db.query.file.findFirst({
			where: eq(file.id_file, id_file),
		});

		if (!fileToUpdate) {
			return res.status(400).json({
				message: 'There is not any file with that id',
				error: 'There is not any file with that id',
			});
		}

		const updatedFile = await db
			.update(file)
			.set({
				id_folder,
				file_name,
			})
			.where(eq(file.id_file, id_file))
			.returning({
				id_file: file.id_file,
				id_folder: file.id_folder,
				file_name: file.file_name,
				url: file.url,
				aws_key: file.aws_key,
			});

		res.status(200).json({
			message: 'Query successful',
			file: updatedFile.at(0),
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
