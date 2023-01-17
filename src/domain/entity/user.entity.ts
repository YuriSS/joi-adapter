export interface InputUserEntity {
  username: string;
  password: string;
}

export class UserEntity {
  public constructor(private _fields: InputUserEntity) {}

  public get username(): string {
    return this._fields.username;
  }

  public get password(): string {
    return this._fields.password;
  }

  public toRaw(): InputUserEntity {
    return {
      username: this.username,
      password: this.password,
    }
  }
}
