import { USERS_URL } from ".";
import { UserWithName, UserState } from "../types";

export const getUsers = async (state: UserState) => {
  const response = await fetch(`${USERS_URL}?state=${state}`);
  return await response.json();
};

export const putUser = async (id: number, state: UserState) => {
  await fetch(`${USERS_URL}/${id}?state=${state}`, {
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
