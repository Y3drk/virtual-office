import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { UserWithName } from "../types";

type Message = {
  author: string;
  text: string;
};

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [tag, setTag] = useState<string | null>(null);

  const getTag = async () => {
    let str = "chat:";

    messages.map((msg) => {
      const newMsg: string = `${msg.author}:${msg.text} `
      str += newMsg;
    });

    console.log(str);

    const newTag = await fetch("/generateTag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: str,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        setTag(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  function sendMessage(text: string) {
    const newMessage = {
      author: "You",
      text: text,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputValue = (event.currentTarget.querySelector("input") as HTMLInputElement)
      .value;
    if (!inputValue) return;
    sendMessage(inputValue);
    (event.currentTarget as HTMLFormElement).reset();
  }

  return (
    <Container>
      <ChatHeader>
        <ChatTitle>Chat</ChatTitle>
        <ExitContainer>
          <Link to="../" style={{ textDecoration: 'none' }}>
            <Exit>X</Exit>
          </Link>
        </ExitContainer>
      </ChatHeader>
      <ChatMessageList>
        {/*<ChatMessage>*/}
        {/*  <span className="message-author">Alice:</span>*/}
        {/*  <span className="message-text">Hi Bob, how are you?</span>*/}
        {/*</ChatMessage>*/}
        {/*<ChatMessage>*/}
        {/*  <span className="message-author">Bob:</span>*/}
        {/*  <span className="message-text">Hey Alice, I'm good. How about you?</span>*/}
        {/*</ChatMessage>*/}
        <ChatMessage>
          {/*<span className="message-author">Alice:</span>*/}
          {/*<span className="message-text">I'm doing well, thanks for asking.</span>*/}
          {messages.map((message, index) => (
            <ChatMessage key={index}>
              <span className="message-author">{message.author}:</span>
              <span className="message-text">{message.text}</span>
            </ChatMessage>
          ))}
        </ChatMessage>
      </ChatMessageList>
      <button onClick={() => {getTag()}}>Get TAG</button>
      {tag && <p>{tag}</p>}
      <ChatForm onSubmit={handleSubmit}>
        <ChatInput type="text" name="input" placeholder="Type a message..." />
        <ChatButton type="submit">Send</ChatButton>
      </ChatForm>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
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
  flex-direction: row;
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
  background-color: #f0f0f0;
  width: 15vw;
  &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  }
`;

export const ChatButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 10px;
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
`;

export const Exit = styled.div`
    width: 1.2rem;
    height 1.2rem;
    font-size: 0.8rem;
    padding-top:0.5vw;
    text-align: center;
    border-radius: 5px;
    color: white;
    background: red;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }

`;
