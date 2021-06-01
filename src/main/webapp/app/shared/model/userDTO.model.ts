export interface IUserDTO {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  country?: string;
}

export class UserDTO implements IUserDTO {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public phone?: string,
    public email?: string,
    public country?: string
  ) {}
}
