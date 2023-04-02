import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";


export const Archive = () => {
    return (
        
        <Container>
          <ExitContainer>
            <Link to="../" style={{ textDecoration: 'none' }}>
              <Exit>X</Exit>
            </Link>
          </ExitContainer>          
         ARCHIVE PLACEHOLDER
        </Container>
    );
};


export const Container = styled.div`
  background-color: grey;
  width: 30rem;
  height: 20rem;
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