import React from "react";
import { Link } from "react-router-dom";
import { StyledTestDiv } from "../styles/StyledTestDiv";

export function LogIn() {
  return (
    <StyledTestDiv>
      <p>LogIn Page</p>
      <button>
        <Link to="office">LogIn!</Link>
      </button>
    </StyledTestDiv>
  );
}
