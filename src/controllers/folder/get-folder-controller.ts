import { LibsqlError } from "@libsql/client";
import { Request, Response } from "express";
import { folderContentSchema } from "../../types/folder";
import { db } from "../../db/db";
import { eq } from "drizzle-orm";
import { folder } from "../../db/schema";

export const getFolderController = async (req: Request, res: Response) => {
  try {

    const { id_folder } = req.params;

    const validateFields = folderContentSchema.safeParse({
      id_folder
    })

    if (!validateFields.success) {
      return res.status(400).json({
        message: "Not valid data",
        error: validateFields.error
      })
    }

    const result = await db.query.folder.findFirst({
      where: eq(folder.id_folder, id_folder)
    })

    res.status(200).json({
      message: "Query successful",
      folder: result,
    })

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