import { LibsqlError } from "@libsql/client";
import { Request, Response } from "express";
import { db } from "../../db/db";
import { file, folder } from "../../db/schema";
import { createFileSchema } from "../../types/file";

export const createFileController = async (req: Request, res: Response) => {
  try {
    const { id_folder, file_name } = req.body;

    const validateFields = createFileSchema.safeParse({
      id_folder,
      file_name
    })

    if (!validateFields.success) {
      return res.status(400).json({
        message: "Not valid data",
        error: validateFields.error
      })
    }

    const result = await db
      .insert(file)
      .values({
        id_folder,
        file_name,
        id_file: crypto.randomUUID(),
        aws_key: "",
        url: "",
      })
      .returning({
        id_folder: file.id_folder,
        file_name: file.file_name,
        id_file: file.id_file,
        aws_key: file.aws_key,
        url: file.url,
      });

    res.json({
      message: "File created",
      file: result.at(0),
    });
  } catch (error) {
    if (error instanceof LibsqlError) {
      return res.status(500).json({
        message: error.message,
        error
      });
    }
    res.status(500).json({
      message: "Something wrong happen unfortunately",
      error
    });
  }
}