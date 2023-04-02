export type UserState = "NOT_LOGGED" | "LOGGED";

export interface UserWithName {
  name: string;
}

export interface User {
  id: number;
  name: string;
  state: UserState;
}

export enum UserStatus {
  NEED_HELP = "Need help",
  CODING = "Coding",
  BUSY = "I'm busy!",
  AFK = "AFK",
}

export interface UserWithPositions {
  id: number;
  name: string;
  state: UserState;
  spawningPoint: number;
  position: number[];
}
