import { Router } from 'express';
import { createFileController } from '../controllers/file/create-file-controller';
import { deleteFileController } from '../controllers/file/delete-file-controller';
import { getFileController } from '../controllers/file/get-file-controller';
import { updateFileController } from '../controllers/file/update-file-controller';
import { validateToken } from '../middlewares/auth/validate-token';
import { uploadFileMiddleware } from '../middlewares/files/upload-file-middleware';

const fileRouter = Router();

fileRouter.get('/:id_file', [validateToken], getFileController);

fileRouter.post(
	'/',
	[validateToken, uploadFileMiddleware],
	createFileController,
);

fileRouter.put('/:id_file', [validateToken], updateFileController);

fileRouter.delete('/:id_file', [validateToken], deleteFileController);

export default fileRouter;
