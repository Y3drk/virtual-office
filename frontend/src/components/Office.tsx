import React, {useEffect, useState} from "react";
import styled from "styled-components";
import locations from "../assets/locations.json";
import {arch} from "os";

interface MovementProps {
    left: number;
    top: number;
}

// interface ContainerProps {
//     image_path: string;
// }

export function Office() {
    //TODO: make left and userTop arrays for different users with local user at 0 index

    const [userLeft, setUserLeft] = useState(0);
    const [userTop, setUserTop] = useState(0);

    const fakeUsers = [0, 1, 2, 3];

    const [othersLeft, setOthersLeft] = useState(fakeUsers.map((fakeUser, index) => 70 * (index+1)));
    const [othersTop, setOthersTop] = useState(fakeUsers.map((fakeUser, index) => 70 * (index+1)));

    const places = locations.locations;
    const archive = places[0];
    const desks = places.slice(1);

    const euklidean_distance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    useEffect(() => {
        for (let otherUserIndex in fakeUsers) {
            if (euklidean_distance(userLeft, userTop, othersLeft[otherUserIndex], othersTop[otherUserIndex]) < 45){
                alert(`User: ${otherUserIndex} is close!`);
            }
        }
    }, [userLeft, userTop, othersLeft, othersTop]);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        switch (event.code) {
            case "ArrowUp":
                setUserTop((top) => top - 10);
                break;

            case "ArrowDown":
                setUserTop((top) => top + 10);
                break;

            case "ArrowLeft":
                setUserLeft((left) => left - 10);
                break;

            case "ArrowRight":
                setUserLeft((left) => left + 10);
                break;
        }
    };

    //TODO spike sockets for movement of other avatars

    return (
        <Container tabIndex={0} onKeyDown={keyDownHandler}>
            <h1>OFFICE</h1>
            {/*//TODO: spawn divs according to the amount of users*/}
            {fakeUsers.map((user, index) => <OthersCircle left={othersLeft[index]}
                                                          top={othersTop[index]}><p>Other#{index}</p></OthersCircle>)}
            <UserCircle top={userTop} left={userLeft}><p>USER</p></UserCircle>
        </Container>
    );
}


export const UserCircle = styled.div<MovementProps>`
    background: blue;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    
    color: white;
    font-size: 11px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`;


export const OthersCircle = styled.div<MovementProps>`
    background: green;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    
    color: white;
    font-size: 11px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`;


export const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  
  width: auto;
  height: auto;
`;

