import multer from "multer"
import multerS3 from "multer-s3"
import { s3Client } from "../s3/s3-client";

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, 'uploads')
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname)
//   }
// })

const storage = multerS3({
  s3: s3Client,
  bucket: '',
  metadata: function (req, file, callback) {
    callback(null, {fieldName: file.fieldname});
  },
  key: function (req, file, callback) {
    callback(null, `${Date.now().toString()+file.originalname}`)
  }
})

export const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024 //1GB
  },
  storage
})