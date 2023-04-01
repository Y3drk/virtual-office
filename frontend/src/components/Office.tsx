import React, {useState} from "react";
import styled from "styled-components";

interface MovementProps {
    left: number;
    top: number;
}

export function Office() {
    //TODO: make left and top arrays for different users with local user at 0 index
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case "ArrowUp":
                setTop((top) => top - 10);
                break;

            case "ArrowDown":
                setTop((top) => top + 10);
                break;

            case "ArrowLeft":
                setLeft((left) => left - 10);
                break;

            case "ArrowRight":
                setLeft((left) => left + 10);
                break;
        }
    };

    //TODO spike sockets for movement of other avatars

    return (
        <Container tabIndex={0} onKeyDown={keyDownHandler}>
            <h1>OFFICE</h1>
            {/*//TODO: spawn divs according to the amount of users*/}
            <Circle top={top} left={left}><p>USER</p></Circle>
        </Container>
    );
}


export const Circle = styled.div<MovementProps>`
    background: blue;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`;


export const Container = styled.div`
  width: 60vw;
  height: 60vh;
  background: orange;
`;

