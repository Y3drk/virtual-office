import React from "react";
import { Link } from "react-router-dom";
import { StyledTestDiv } from "../styles/StyledTestDiv";

export function Home() {
  return (
    <StyledTestDiv>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button>
        <Link to="test">To TEST!</Link>
      </button>
    </StyledTestDiv>
  );
}
