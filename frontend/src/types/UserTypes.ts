export type UserState = "NOT_LOGGED" | "LOGGED";

// export type UserStatus = "NEED_HELP" | "CODING" | "BUSY" | "AFK";
export enum UserStatus {
  NEED_HELP = "Need help",
  CODING = "Coding",
  BUSY = "I'm busy!",
  AFK = "Afooa",
}
export interface UserWithName {
  name: string;
}

export interface User {
  id: number;
  name: string;
  state: UserState;
  status: UserStatus;
}

export interface UserWithPositions {
  id: number;
  name: string;
  state: UserState;
  status: UserStatus;
  spawningPoint: number;
  position: number[];
}
