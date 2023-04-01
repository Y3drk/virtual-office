type UserState = "active" | "inactive";

export interface UserWithName {
  name: string;
}

export interface User {
  id: number;
  name: string;
  state: UserState;
}
