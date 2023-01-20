export default class NoteDto {
  id;
  title;
  body;
  tags;
  date;
  file;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.body = model.body;
    this.date = model.date;
    this.tags = model.tags;

    if (model.file) {
      this.file = {
        id: model.file.id,
        url: model.file.url,
        name: model.file.name,
      };
    }
  }
}
