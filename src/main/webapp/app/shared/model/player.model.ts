import { IUser } from 'app/core/user/user.model';

export interface IPlayer {
  id?: string;
  user?: IUser;
}

export class Player implements IPlayer {
  constructor(public id?: string, public user?: IUser) {}
}
