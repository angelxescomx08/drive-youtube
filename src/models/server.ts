import cors from 'cors';
import express, { type Express } from 'express';
import fileRouter from '../routes/file';
import folderRouter from '../routes/folder';
import userRouter from '../routes/user';

export class Server {
	private app: Express;
	private port: number;

	constructor() {
		this.app = express();
		this.port = 3000;

		this.applyMiddlewares();
		this.routes();
	}

	applyMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use('/uploads', express.static('uploads'));
	}

	routes() {
		this.app.use('/user', userRouter);
		this.app.use('/folder', folderRouter);
		this.app.use('/file', fileRouter);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server is listening on port ${this.port}`);
		});
	}
}
