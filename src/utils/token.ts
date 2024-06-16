import jwt from "jsonwebtoken"

export const signToken = (id_user:string,email: string)=>{
  const token = jwt.sign({
    id_user,
    email
  },'MyS3ctr3t*',{
    expiresIn: "2w"
  })
  return token
}

export const verifyToken = (token:string)=>{
  try {
    jwt.verify(token,'MyS3ctr3t*')
    return true
  } catch (error) {
    return false
  }
}