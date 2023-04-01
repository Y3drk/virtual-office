import React from "react";
import { Link } from "react-router-dom";
import { StyledTestDiv } from "../styles/StyledTestDiv";
import { useEffect, useState } from "react";
import styled from "styled-components";

type Message = {
    author: string;
    text: string;
  };

export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    function sendMessage(text: string) {
      const newMessage = {
        author: 'You',
        text: text,
      };
      setMessages([...messages, newMessage]);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputValue = (event.currentTarget.querySelector('input') as HTMLInputElement).value;
        sendMessage(inputValue);
        (event.currentTarget as HTMLFormElement).reset();
      }
    return (
        <Container>
            <ChatHeader>
                <ChatTitle>Chat</ChatTitle>
                <ExitContainer>
                <Link to ="../"><Exit>
                    X
                </Exit>
                </Link>
            </ExitContainer>
            </ChatHeader>
            <ChatMessageList>
                <ChatMessage>
                    <span className="message-author">Alice:</span>
                    <span className="message-text">Hi Bob, how are you?</span>
                </ChatMessage>
                <ChatMessage>
                    <span className="message-author">Bob:</span>
                    <span className="message-text">Hey Alice, I'm good. How about you?</span>
                </ChatMessage>
                <ChatMessage>
                    <span className="message-author">Alice:</span>
                    <span className="message-text">I'm doing well, thanks for asking.</span>
                </ChatMessage>
            </ChatMessageList>
            <ChatForm onSubmit={handleSubmit}>
                <ChatInput type="text" name="input" placeholder="Type a message..." />
                <ChatButton type="submit">Send</ChatButton>
            </ChatForm>
        </Container>
      );
}


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 30vh;
  background-color: #f0f0f0;
  justify-content: space-between;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ChatTitle = styled.h2`
  margin: 0;
  font-size: 24px;
`;

export const ChatMessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
`;

export const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  & .message-author {
    font-weight: bold;
    margin-bottom: 5px;
  }

  & .message-text {
    white-space: pre-wrap;
  }
`;

export const ChatForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
`;

export const ChatInput = styled.input`
  flex: 1;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f0f0f0;

  &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export const ChatButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #3e8e41;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ExitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Exit = styled.div`
    width: 2vw;
    height 2vw;
    text-align: center;
    border-radius: 5px;
    color: white;
    background: red;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }

`;