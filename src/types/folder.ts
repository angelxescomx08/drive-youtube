import z from 'zod';

export const folderSchema = z.object({
	id_folder: z.string().uuid(),
	id_parent: z.string().uuid().nullable(),
	id_user: z.string().uuid(),
	folder_name: z.string(),
});

export const createFolderSchema = folderSchema.omit({
	id_folder: true,
});

export const folderContentSchema = folderSchema.pick({
	id_folder: true,
});

export const updateFolderSchema = folderSchema
	.omit({
		id_user: true,
	})
	.partial({
		folder_name: true,
		id_parent: true,
	});

export type typeFolder = z.infer<typeof folderSchema>;
export type typeCreateFolder = z.infer<typeof createFolderSchema>;
export type typeFolderContentSchema = z.infer<typeof folderContentSchema>;
export type typeFolderUpdateSchema = z.infer<typeof updateFolderSchema>;
