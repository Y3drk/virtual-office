import React from "react";
import { Link } from "react-router-dom";
import { StyledTestDiv } from "../styles/StyledTestDiv";
import { useEffect, useState } from "react";
import styled from "styled-components";


export const Chat = () => {
    return (
        <Container>
            <div>Test</div>
            <ExitContainer>
                <Link to ="../"><Exit>
                    X
                </Exit>
                </Link>
            </ExitContainer>
        </Container>
      );
}

export const Container = styled.div`
  width: 30vw;
  height: 30vh;
  background: green;
  display: flex;
  justify-content: space-between;
`;

export const ExitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const Exit = styled.div`
    width: 2vw;
    height 2vw;
    color: white;
    background: red;
    &:hover{
        cursor: pointer;
        opacity: 0.5;
    }
`;