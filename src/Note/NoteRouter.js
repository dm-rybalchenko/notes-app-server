import Router from 'express';
import NoteController from './NoteController.js';


const NoteRouter = new Router();

NoteRouter.get('/', NoteController.getAll);
NoteRouter.post('/', NoteController.create);
NoteRouter.put('/', NoteController.update);
NoteRouter.delete('/:id', NoteController.delete);

export default NoteRouter;
