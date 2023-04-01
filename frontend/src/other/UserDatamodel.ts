export type UserStatus = "Need help" | "Coding" | "I'm busy!";

export type User = {
  user_id: number;
  nickname: string;
  spawningPoint: 0 | 1 | 2 | 3 | 4;
  position: number[];
  status: UserStatus;
};