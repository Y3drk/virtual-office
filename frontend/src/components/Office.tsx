import React, { useState } from "react";

import { Link, Outlet, Route, Routes } from "react-router-dom";

import styled from "styled-components";

interface MovementProps {
  left: number;
  top: number;
}

export function Office() {
  //TODO: make left and top arrays for different users with local user at 0 index
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const loggedInUser = localStorage.getItem("user");

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

  //TODO spike sockets for movement of other avatars

  return (
    <div>
      <p>User from local storage: {loggedInUser}</p>
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
  );
}

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

