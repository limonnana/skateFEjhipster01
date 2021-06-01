import { IPhoto } from './photo.model';

export interface ISpot {
  id?: string;
  name?: string;
  description?: string;
  photos?: IPhoto[];
}

export class Spot implements ISpot {
  constructor(public id?: string, public name?: string, public description?: string, public photos?: IPhoto[]) {}
}
