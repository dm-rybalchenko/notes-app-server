import fileService from '../services/file-service.js';


class FileController {
  async create(req, res, next) {
    try {
      const file = await fileService.upload(req.file);
      return res.json(file);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const updatedFile = await fileService.update(req.params.id, req.file);
      return res.json(updatedFile);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedFile = await fileService.delete(req.params.id);
      return res.json(deletedFile);
    } catch (e) {
      next(e);
    }
  }
}

export default new FileController();
