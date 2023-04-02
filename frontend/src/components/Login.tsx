import { useEffect, useState } from "react";
import type { User, UserState } from "../types";
import { getUsers, putUser } from "../config";
import { Button, ButtonLink } from "../styles";
import styled from "styled-components";

const colorOptions = [
  { value: "red", label: "Red", color: "#ff0000" },
  { value: "green", label: "Green", color: "#00ff00" },
  { value: "blue", label: "Blue", color: "#0000ff" },
  { value: "yellow", label: "Yellow", color: "#ffff00" },
  { value: "orange", label: "Orange", color: "#ff8c00" },
  { value: "purple", label: "Purple", color: "#800080" },
  { value: "pink", label: "Pink", color: "#ffc0cb" },
  { value: "gray", label: "Gray", color: "#808080" },
  { value: "brown", label: "Brown", color: "#a52a2a" },
  { value: "black", label: "Black", color: "#000000" },
];

export const Login = () => {
  const [notLoggedUsers, setFreeUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  
  const getNotLoggedUsers = async () => {
    const users = await getUsers("NOT_LOGGED");
    console.log(users);
    setFreeUsers(users);
  };

  const handleUserSelected = (e: any) => {
    const user = JSON.parse(e.target.value);
    setSelectedUser(user);
  };

  const handleColorSelected = (e: any) => {
    setSelectedColor(e.target.value);
  };

  const logInUser = async () => {
    if (selectedUser) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...selectedUser, state: "LOGGED" }),
      );
      return await putUser(selectedUser.id, { data: "LOGGED", field: "state" });
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
        {notLoggedUsers.length ? (
          <SelectContainer>
            <Select onChange={handleUserSelected} defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Select user
              </option>
              {notLoggedUsers.map((user) => (
                <option key={user.id} value={JSON.stringify(user)}>
                  {user.name}
                </option>
              ))}
            </Select>
            <Select
              onChange={handleColorSelected}
              defaultValue={"DEFAULT"}
              style={{ backgroundColor: selectedColor }}
            >
              <option value="DEFAULT" disabled>
                Select color
              </option>
              {colorOptions.map((color) => (
                <option key={color.value} value={color.value} style={{backgroundColor: color.value}}>
                  {color.label}
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
