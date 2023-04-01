import { useState } from "react";
import { UserWithName } from "../types";
import styled from "styled-components";

const USER_NUMBERS = 5;

export const Admin = () => {
  const [newUsers, setNewUsers] = useState<UserWithName[]>([]);

  const postNewUsers = () => {
    console.log(newUsers);
  };

  const saveUser = (idx: number, e: any) => {
    const newArr = [...newUsers];
    newArr[idx] = e.target.value;
    setNewUsers(newArr);
  };

  return (
    <div>
      <p>Admin panel</p>
      <div>
        {[...Array(USER_NUMBERS)].map((i) => (
          <input
            name="name"
            key={i}
            onChange={(e) => saveUser(i, e)}
            placeholder="user name"
          />
        ))}
      </div>
      <button onClick={postNewUsers}>Create office</button>
    </div>
  );
};
