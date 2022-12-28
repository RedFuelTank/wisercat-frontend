export class LoginResponse {
  public username : string;
  public token : string;
  public roles : Role[];


  constructor(username: string, token: string, role : string) {
    this.username = username;
    this.token = token;
    this.roles = role.split(", ") as Role[];
  }
}

export enum Role {
  User = "ROLE_USER",
  Admin = "ROLE_ADMIN"
}
