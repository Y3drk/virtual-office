import React from "react";
import styled from "styled-components";

export type BackdropProps = {
    onClick(): void;
};

export const Backdrop = (props: BackdropProps) => {
    return <StyledBackdrop onClick={props.onClick}/>;
};


export const StyledBackdrop = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;