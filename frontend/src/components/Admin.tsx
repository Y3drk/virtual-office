import { useState } from "react";
import { UserWithName } from "../types";
import styled from "styled-components";
import { Button, ButtonLink } from "../styles";
import { postUsers } from "../config";

const USER_NUMBERS = 5;

export const Admin = () => {
  const [newUsers, setNewUsers] = useState<UserWithName[]>([]);

  const postNewUsers = async () => {
    await postUsers(newUsers);
  };

  const saveUser = (idx: number, e: any) => {
    const newArr = [...newUsers];
    newArr[idx] = { name: e.target.value };
    setNewUsers(newArr);
  };

  return (
    <div>
      <h2>Admin panel</h2>
      <div>
        {[...Array(USER_NUMBERS)].map((x, i) => (
          // added to avoid warning
          <InputRow key={i + 10}>
            <input
              name="name"
              key={i}
              onChange={(e) => saveUser(i, e)}
              placeholder="user name"
            />
          </InputRow>
        ))}
      </div>
      <Button onClick={postNewUsers}>
        <ButtonLink to="..">Create office </ButtonLink>
      </Button>
    </div>
  );
};

const InputRow = styled.div`
  margin-bottom: 10px;
`;
