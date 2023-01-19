import Router from 'express';
import noteController from '../controllers/note-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';


const noteRouter = new Router();

noteRouter.get('/', authMiddleware, noteController.getAll);
noteRouter.post('/', authMiddleware, noteController.create);
noteRouter.put('/', authMiddleware, noteController.update);
noteRouter.delete('/:id', authMiddleware, noteController.delete);

export default noteRouter;
