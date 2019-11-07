export class Receipe {
  name: string;
  description: string;
  imageURL: string;

  constructor(name, desc, url) {
    this.name = name;
    this.imageURL = url;
    this.description = desc;
  }
}


