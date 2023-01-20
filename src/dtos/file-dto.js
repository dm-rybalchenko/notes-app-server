export default class FileDto {
  id;
  url;
  name;

  constructor(model, name) {
    this.id = model.public_id;
    this.url = model.secure_url;
    this.name = name;
  }
}
