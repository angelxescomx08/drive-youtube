import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { LibsqlError } from '@libsql/client';
import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { envs } from '../../config/env';
import { db } from '../../db/db';
import { file } from '../../db/schema';
import { s3Client } from '../../lib/s3/s3-client';
import { getFileSchema } from '../../types/file';

export const deleteFileController = async (req: Request, res: Response) => {
	try {
		const { id_file } = req.params;

		const validateFields = getFileSchema.safeParse({
			id_file,
		});

		if (!validateFields.success) {
			return res.status(400).json({
				message: 'Not valid data',
				error: validateFields.error,
			});
		}

		const fileToDelete = await db.query.file.findFirst({
			where: eq(file.id_file, id_file),
		});

		if (!fileToDelete) {
			return res.status(400).json({
				message: 'There is not any file with that id',
				error: 'There is not any file with that id',
			});
		}

		await s3Client.send(
			new DeleteObjectCommand({
				Bucket: envs.AWS_BUCKET_NAME,
				Key: fileToDelete.aws_key,
			}),
		);

		const result = await db
			.delete(file)
			.where(eq(file.id_file, id_file))
			.returning({
				id_folder: file.id_folder,
				file_name: file.file_name,
				id_file: file.id_file,
				aws_key: file.aws_key,
				url: file.url,
			});

		res.status(200).json({
			message: 'Deleted successfully',
			file: result.at(0),
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
