import { LibsqlError } from "@libsql/client";
import { Request, Response } from "express";
import { folderContentSchema } from "../../types/folder";
import { db } from "../../db/db";
import { eq, isNull, SQL } from "drizzle-orm";
import { folder } from "../../db/schema";

export const getContentFolderController = async (req: Request, res: Response) => {
  try {

    const { id_folder } = req.params;

    let query: SQL<unknown>

    if (id_folder.toLocaleLowerCase() === "root") {
      query = isNull(folder.id_parent)
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

      query = eq(folder.id_parent, id_folder)
    }


    const result = await db.query.folder.findMany({
      where: query
    })

    res.status(200).json({
      message: "Query successful",
      folders: result,
      //TODO: Pendiente de implementar
      files: []
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