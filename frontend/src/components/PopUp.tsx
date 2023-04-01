import React from "react";
import styled from "styled-components";

export type PopUpProps = {
    onClose(): void;
    type: "chat" | "archive" | "chatbot"
}

export const PopUp = (props: PopUpProps) => {
return (<StyledModal>
    <p>POP UP TEST!</p>
    <button onClick={props.onClose}>CLOSE</button>
</StyledModal>);
};


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