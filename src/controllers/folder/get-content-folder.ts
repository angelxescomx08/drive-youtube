import { LibsqlError } from '@libsql/client';
import { type SQL, eq, isNull, sql } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../../db/db';
import { file, folder } from '../../db/schema';
import { folderContentSchema } from '../../types/folder';

export const getFolderPathRaw = async (
  id_folder: string
): Promise<{ path: string; ids: string } | null> => {
  const result = await db.run(sql`
    WITH RECURSIVE folder_path(id_folder, id_parent, folder_name, path, path_ids) AS (
      SELECT
        id_folder,
        id_parent,
        folder_name,
        folder_name as path,
        id_folder as path_ids
      FROM folder
      WHERE id_folder = ${id_folder}

      UNION ALL

      SELECT
        f.id_folder,
        f.id_parent,
        f.folder_name,
        f.folder_name || '/' || fp.path,
        f.id_folder || '/' || fp.path_ids
      FROM folder f
      JOIN folder_path fp ON f.id_folder = fp.id_parent
    )
    SELECT path, path_ids
    FROM folder_path
    WHERE id_parent IS NULL
    LIMIT 1;
  `);

  const rows = result.rows as unknown as Array<{
    path: string;
    path_ids: string;
  }>;

  if (!rows[0]) {
    return null;
  }

  // path final
  const path = `/root/${rows[0].path ?? ''}`;

  const ids = `/root/${rows[0].path_ids ?? ''}`;

  return { path, ids };
};


export const getContentFolderController = async (
	req: Request,
	res: Response,
) => {
	try {
		const { id_folder } = req.params;

		let queryFolders: SQL<unknown>;
		let queryFiles: SQL<unknown>;

		if (id_folder.toLocaleLowerCase() === 'root') {
			queryFolders = isNull(folder.id_parent);
			queryFiles = isNull(file.id_folder);
		} else {
			const validateFields = folderContentSchema.safeParse({
				id_folder,
			});

			if (!validateFields.success) {
				return res.status(400).json({
					message: 'Not valid data',
					error: validateFields.error,
				});
			}

			queryFolders = eq(folder.id_parent, id_folder);
			queryFiles = eq(file.id_folder, id_folder);
		}

		const [folders, files, paths] = await Promise.all([
			db.query.folder.findMany({
				where: queryFolders,
			}),
			db.query.file.findMany({
				where: queryFiles,
			}),
			getFolderPathRaw(id_folder),
		]);

		res.status(200).json({
			message: 'Query successful',
			folders,
			files,
			paths,
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
