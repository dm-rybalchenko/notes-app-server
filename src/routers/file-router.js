import Router from 'express';
import fileController from '../controllers/file-controller.js';
import uploader from '../middlewares/upload-middleware.js';
import authMiddleware from '../middlewares/auth-middleware.js';


const fileRouter = new Router();

fileRouter.post('/', authMiddleware, uploader, fileController.create);
fileRouter.put('/:id', authMiddleware, uploader, fileController.update);
fileRouter.delete('/:id', authMiddleware, fileController.delete);

export default fileRouter;
