import {User, UserState} from "../types";

export enum UserStatus {
  NEED_HELP = "Need help",
  CODING = "Coding",
  BUSY = "I'm busy!",
  AFK = "AFK"
}

export interface ClientsideUser {
  id: number;
  name: string;
  state: UserState;
  spawningPoint: number;
  position: number[];
  // status: UserStatus;
};