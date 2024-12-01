import { LibsqlError } from "@libsql/client";
import { Request, Response } from "express";
import { folderContentSchema } from "../../types/folder";
import { db } from "../../db/db";
import { eq, isNull, SQL } from "drizzle-orm";
import { file, folder } from "../../db/schema";

export const getContentFolderController = async (req: Request, res: Response) => {
  try {

    const { id_folder } = req.params;

    let queryFolders: SQL<unknown>
    let queryFiles: SQL<unknown>

    if (id_folder.toLocaleLowerCase() === "root") {
      queryFolders = isNull(folder.id_parent)
      queryFiles = isNull(file.id_folder)
    } else {
      const validateFields = folderContentSchema.safeParse({
        id_folder
      })

      if (!validateFields.success) {
        return res.status(400).json({
          message: "Not valid data",
          error: validateFields.error
        })
      }

      queryFolders = eq(folder.id_parent, id_folder)
      queryFiles = eq(file.id_folder, id_folder)
    }

    const [folders,files] = await Promise.all([
      db.query.folder.findMany({
        where: queryFolders
      }),
      db.query.file.findMany({
        where: queryFiles
      })
    ])

    res.status(200).json({
      message: "Query successful",
      folders,
      files
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