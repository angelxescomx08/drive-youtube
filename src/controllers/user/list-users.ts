import { Request, Response } from "express";
import { schemaQuery } from "../../types/general";
import { convertToNumber } from "../../utils/numbers";
import { db } from "../../db/db";

// localhots:3000/user?page=0&per_page=10
export const getUsers = async (req: Request, res: Response) => {
  try{
    const validFields = schemaQuery.safeParse({
      page: convertToNumber(req.query.page, 0),
      per_page:  convertToNumber(req.query.per_page,10)
    })
    if(!validFields.success){
      return res.status(400).json({
        message: "Not valid data",
        error: "Not valid data"
      })
    }
    const {page,per_page} = validFields.data
    const users = await db.query.user.findMany({
      columns: {
        id_user: true,
        email: true
      },
      limit: per_page,
      offset: page*per_page
    })
    res.json({
      message: "Successfull query",
      users
    })
  }catch(error){
    console.log(error)
    res.status(500).json({
      error,
      message: "Something wrong happen"
    })
  }
}