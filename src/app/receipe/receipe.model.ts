import { Ingrediant } from "./../shared/ingrediant.model";
export class Receipe {
  id: number;
  name: string;
  description: string;
  imageURL: string;
  ingrediants: Ingrediant[];
  restId?: string;

  constructor(id, name, desc, url, ingrediants, rId?) {
    this.id = id;
    this.name = name;
    this.imageURL = url;
    this.description = desc;
    this.ingrediants = ingrediants;
    this.restId = rId;
  }
}
