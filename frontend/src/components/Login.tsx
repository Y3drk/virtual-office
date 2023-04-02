import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User, UserState } from "../types";
import { getUsers, putUser } from "../config";
import { Button, ButtonLink } from "../styles";
import styled from "styled-components";

export const Login = () => {
  const [freeUsers, setFreeUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getNotLoggedUsers = async () => {
    const users = await getUsers("NOT_LOGGED");
    console.log(users);
    setFreeUsers(users);
  };

  const handleUserSelected = (e: any) => {
    const user = JSON.parse(e.target.value);
    setSelectedUser(user);
  };

  const logInUser = async () => {
    if (selectedUser) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...selectedUser, state: "LOGGED" }),
      );
      return await putUser(selectedUser.id, "LOGGED");
    }
  };

  useEffect(() => {
    getNotLoggedUsers();
    if (selectedUser) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...selectedUser, state: "NOT_LOGGED" }),
      );
    }
  }, []);

  return (
    <div>
      <h2>Login page</h2>

      <Button>
        <ButtonLink to="admin">Admin panel</ButtonLink>
      </Button>

      <Content>
        {freeUsers.length ? (
          <SelectContainer>
            <Select onChange={handleUserSelected} defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Select user
              </option>
              {freeUsers.map((user) => (
                <option key={user.id} value={JSON.stringify(user)}>
                  {user.name}
                </option>
              ))}
            </Select>
            {selectedUser && (
              <Button onClick={logInUser}>
                <ButtonLink to="office">Login</ButtonLink>
              </Button>
            )}
          </SelectContainer>
        ) : (
          <p>All users are logged in!</p>
        )}
      </Content>
    </div>
  );
};

const Content = styled.div`
  margin-top: 30px;
`;

const Select = styled.select`
  width: 200px;
  padding: 8px 16px;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 20px;
`;
