import Router from 'express';
import FileController from './FileController.js';
import { uploader } from './File.js';


const FileRouter = new Router();

FileRouter.post('/upload', uploader, FileController.create);
FileRouter.put('/upload/:id', uploader, FileController.update);
FileRouter.delete('/upload/:id', FileController.delete);

export default FileRouter;
