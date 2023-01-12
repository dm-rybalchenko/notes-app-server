import FileService from './FileService.js';


class FileController {
  async create(req, res) {
    try {
      const file = await FileService.upload(req.file);
      return res.json(file);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedFile = await FileService.update(req.params.id, req.file);
      return res.json(updatedFile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedFile = await FileService.delete(req.params.id);
      return res.json(deletedFile);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new FileController();
