import React from "react";
import { Link } from "react-router-dom";
import { StyledTestDiv } from "../styles/StyledTestDiv";
import { useEffect, useState } from "react";
import styled from "styled-components";

// interface Client {
//   id: number;
//   name: string;
//   email: string;
// }

export const Home = () => {
  // const [clients, setClients] = useState<Client[]>([]);

  // const getClients = async () => {
  //   const response = await fetch("/clients");
  //   const body = await response.json();
  //   setClients(body);
  // };

  // useEffect(() => {
  //   getClients();
  // }, []);

  return (
    <StyledTestDiv>
      {/* 
      <div className="App">
        <header className="App-header">
          <div className="App-intro">
            <h2>Clients</h2>
            {clients.map((client) => (
              <div key={client.id}>
                <p>name: {client.name} </p>
                <Row>email: {client.email}</Row>
              </div>
            ))}
          </div>
        </header>
      </div> */}
    </StyledTestDiv>
  );
};

const Row = styled.p`
  background-color: red;
  font-size: 29px;
`;
