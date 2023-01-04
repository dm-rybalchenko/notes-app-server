import NoteService from './NoteService.js';

class NoteController {
  async getAll(req, res) {
    try {
      const notes = await NoteService.getAll();
      return res.json(notes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const note = await NoteService.create(req.body, req?.files?.file);
      return res.json(note);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedNote = await NoteService.update(req.body, req?.files?.file);
      return res.json(updatedNote);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedNote = await NoteService.delete(req.params.id);
      return res.json(deletedNote);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new NoteController();
