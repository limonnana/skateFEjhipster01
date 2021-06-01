export interface IAddTrick {
  idEvent?: string;
  idTrick?: string;
}

export class AddTrick implements IAddTrick {
  constructor(public idEvent?: string, public idTrick?: string) {}
}
