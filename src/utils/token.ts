import jwt from "jsonwebtoken"
import 'dotenv/config'

export const signToken = (id_user:string,email: string)=>{
  const token = jwt.sign({
    id_user,
    email
  },process.env.SECRET_PASSWORD_KEY!,{
    expiresIn: "2w"
  })
  return token
}

export const verifyToken = (token:string)=>{
  try {
    jwt.verify(token,process.env.SECRET_PASSWORD_KEY!)
    return true
  } catch (error) {
    return false
  }
}