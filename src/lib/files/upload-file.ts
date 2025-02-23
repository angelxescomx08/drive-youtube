import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3Client } from '../s3/s3-client';
import { envs } from '../../config/env';

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
	bucket: envs.AWS_BUCKET_NAME,
	metadata: (req, file, callback) => {
		callback(null, { fieldName: file.fieldname });
	},
	key: (req, file, callback) => {
		callback(null, `${crypto.randomUUID()}-${file.originalname}`);
	},
});

export const upload = multer({
	limits: {
		fileSize: 1 * 1024 * 1024 * 1024, //1GB
	},
	storage,
});
