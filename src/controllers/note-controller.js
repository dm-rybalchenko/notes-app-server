import noteService from '../services/note-service.js';


class NoteController {
  async getAll(req, res, next) {
    try {
      const notes = await noteService.getAll(req.user.id);
      return res.json(notes);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const note = await noteService.create(req.user.id, req.body);
      return res.json(note);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const updatedNote = await noteService.update(req.user.id, req.body);
      return res.json(updatedNote);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedNote = await noteService.delete(req.user.id, req.params.id);
      return res.json(deletedNote);
    } catch (e) {
      next(e);
    }
  }
}

export default new NoteController();
