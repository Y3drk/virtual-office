import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ChatButton } from "./Office";

export type PopUpProps = {
    onClose(): void;
    type: PopUpType;
}

export type PopUpType = "chat" | "archive" | "chatbot"

export const PopUp = (props: PopUpProps) => {
  const [showButton, setShowButton] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/office/" || location.pathname === "/office") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [location.pathname]);

  const handleStartConversation = () => {
    setShowButton(false);
  };
  console.log(props.type);
  return (
    <StyledModal>
      {showButton && props.type === "chat" ? (
        <Link to="chat" style={{ textDecoration: "none" }}>
          <ChatButton onClick={handleStartConversation}>
            Start Conversation
          </ChatButton>
        </Link>
      ) : null}
      {showButton && props.type === "archive" ? (
        <Link to="archive" style={{ textDecoration: "none" }}>
          <ChatButton onClick={handleStartConversation}>
            Show Archive
          </ChatButton>
        </Link>
      ) : null}
      <Outlet />
      <p></p>
      
      {showButton ? (
        <CloseButton onClick={props.onClose}>CLOSE</CloseButton>
      ) : null}
    </StyledModal>
  );
};


export const CloseButton = styled.div`
  text-align: center;
  border-radius: 5px;
  color: white;
  background: red;
  width: 25%;
  margin-left: 37%;
  &:hover{
    cursor: pointer;
    opacity: 0.5;
}
`

export const StyledModal = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  text-align: center;
  width: 30rem;
  z-index: 10;
  position: fixed;
  top: 20vh;
  left: calc(50% - 15rem);
`;