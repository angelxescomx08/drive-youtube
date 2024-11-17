import multer from "multer"

export const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads")
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

export const upload = multer({
  limits: {
    fileSize: 1 * 1024 * 1024 * 1024 //1GB
  },
  storage
})