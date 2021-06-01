export interface IPhoto {
  id?: string;
  title?: string;
  image?: string;
}

export class Photo implements IPhoto {
  constructor(public id?: string, public title?: string, public image?: string) {}
}
