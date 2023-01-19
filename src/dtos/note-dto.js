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
    this.file = model.file;
  }
}
