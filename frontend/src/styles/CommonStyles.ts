import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  background-color: #4caf50;
  border: none;
  padding: 8px 16px;
  text-align: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
  &:hover{
    cursor: pointer;
    opacity: 0.5;
}
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
