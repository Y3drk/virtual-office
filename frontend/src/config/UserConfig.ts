import { USERS_URL } from ".";
import { UserWithName, UserState, UserStatus } from "../types";

export const getUsers = async (state: UserState) => {
  const response = await fetch(`${USERS_URL}?state=${state}`);
  return await response.json();
};

type StateData = {
  data: UserState;
  field: "state";
};

type StatusData = {
  data: UserStatus;
  field: "status";
};

type Data = StateData | StatusData;

export const putUser = async (id: number, data: Data) => {
  await fetch(`${USERS_URL}/${id}/${data.field}?${data.field}=${data.data}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const postUsers = async (users: UserWithName[]) => {
  await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


