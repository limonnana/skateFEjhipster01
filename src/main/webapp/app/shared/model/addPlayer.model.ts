export interface IAddPlayer {
  idEvent?: string;
  idPlayer?: string;
}

export class AddPlayer implements IAddPlayer {
  constructor(public idEvent?: string, public idPlayer?: string) {}
}
