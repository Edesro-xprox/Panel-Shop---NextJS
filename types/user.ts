export interface User {
  _id: string;
  user: string;
}

export interface UserPayload {
  user: string;
  password?: string;
}
