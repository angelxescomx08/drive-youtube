import z from "zod"

export const fileSchema = z.object({
  id_file: z.string().uuid(),
  id_folder: z.string().uuid().nullable(),
  file_name: z.string(),
  aws_key: z.string(),
  url: z.string(),
})

export const createFileSchema = fileSchema.omit({
  id_file: true,
  aws_key: true,
  url: true
})

export const getFileSchema = fileSchema.pick({
  id_file: true
})

export type typeFile = z.infer<typeof fileSchema>
export type typeCreateFile = z.infer<typeof createFileSchema>
export type typeGetFile = z.infer<typeof getFileSchema>

export type FileS3 = {
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  size: number,
  bucket: string,
  key: string,
  acl: string,
  contentType: string,
  contentDisposition: null,
  contentEncoding: null,
  storageClass: string,
  serverSideEncryption: null,
  metadata: { fieldName: string },
  location: string,
  etag: string,
  versionId: undefined
}