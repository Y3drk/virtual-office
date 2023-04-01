export type UserState = "NOT_LOGGED" | "LOGGED";

export interface UserWithName {
  name: string;
}

export interface User {
  id: number;
  name: string;
  state: UserState;
}
