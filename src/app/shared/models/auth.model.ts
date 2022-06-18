export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  statusCode: number;
  uID: string;
  access_token: string;
}
