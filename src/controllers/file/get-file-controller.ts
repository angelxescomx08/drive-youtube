import { LibsqlError } from "@libsql/client";
import { Request, Response } from "express";
import { getFileSchema } from "../../types/file";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { file } from "../../db/schema";

export const getFileController = async (req: Request, res: Response) => {
  try {
    const { id_file } = req.params;

    const validateFields = getFileSchema.safeParse({
      id_file
    })

    if (!validateFields.success) {
      return res.status(400).json({
        message: "Not valid data",
        error: validateFields.error
      })
    }

    const fileResult = await db.query.file.findFirst({
      where: eq(file.id_file, id_file)
    })

    res.json({
      message: "Get file",
      file: fileResult,
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