import React, { useEffect, useState } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { User } from "../types";
import { putUser } from "../config";
import { Button } from "../styles";

interface MovementProps {
  left: number;
  top: number;
}

export function Office() {
  //TODO: make left and top arrays for different users with local user at 0 index
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [currentUser, setCurrrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const logoutUser = async () => {
    if (currentUser) {
      const response = await putUser(currentUser.id, "NOT_LOGGED");
      navigate("..");
      return response;
    }
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "ArrowUp":
        setTop((top) => top - 10);
        break;

      case "ArrowDown":
        setTop((top) => top + 10);
        break;

      case "ArrowLeft":
        setLeft((left) => left - 10);
        break;

      case "ArrowRight":
        setLeft((left) => left + 10);
        break;
    }
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      const parsedLoggedIn = JSON.parse(loggedInUser);
      setCurrrentUser(parsedLoggedIn);
    }
  }, []);

  //TODO spike sockets for movement of other avatars

  return (
    <div>
      {currentUser && (
        <div>
          <DataRow>
            <h2>User from local storage: {currentUser.name}</h2>
            <Button onClick={logoutUser}>Logout</Button>
          </DataRow>

          <Container tabIndex={0} onKeyDown={keyDownHandler}>
            <h1>OFFICE</h1>
            {/*//TODO: spawn divs according to the amount of users*/}
            <Circle top={top} left={left}>
              <p>USER</p>
            </Circle>
            <Link to="chat">
              <ChatButton>Click</ChatButton>
            </Link>
            <Outlet />
          </Container>
        </div>
      )}
    </div>
  );
}

const DataRow = styled.div`
  margin-bottom: 30px;
`;

export const Circle = styled.div<MovementProps>`
  background: blue;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;

  margin-top: 100px;
`;

export const Container = styled.div`
  width: 60vw;
  height: 60vh;
  background: orange;
`;

export const ChatButton = styled.div`
  width: 5vw;
  height: 3vh;
  background: red;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
