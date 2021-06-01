import { IUser } from 'app/core/user/user.model';

export interface IFan {
  id?: string;
  user?: IUser;
}

export class Fan implements IFan {
  constructor(public id?: string, public user?: IUser) {}
}
