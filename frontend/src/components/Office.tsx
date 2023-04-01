import React, {useEffect, useState} from "react";
import styled from "styled-components";
import locations from "../assets/locations.json";
import {User} from "../other/UserDatamodel";
import {PopUp} from "./PopUp";
import {Backdrop} from "./Backdrop";
import image from "../assets/office_5.jpg";

interface MovementProps {
    left: number;
    top: number;
}

const USER_PROXIMITY_RANGE = 70;
const OBJECT_PROXIMITY_RANGE = 100;
const AVATAR_SIZE = 70;
const LAYOUT_TOP_OFFSET = 120;
const LAYOUT_LEFT_OFFSET = 50;

const MAX_LEFT = 1540;
const MAX_TOP = 687;
const MOVE_BY = 10;

export function Office() {
    //TODO: spike sockets for movement of other avatars SOCKETS

    const places = locations.locations;
    const archive = places[0];
    const desks = places.slice(1);

    const currentUser: User = {user_id: 5, nickname: "Kotek Erjotek", position: [0,0], spawningPoint: 4, status: "Coding"};

    const [userLeft, setUserLeft] = useState(desks[currentUser.spawningPoint].center[0]);
    const [userTop, setUserTop] = useState(desks[currentUser.spawningPoint].center[1]);

    console.log(userLeft, userTop);

    const [popUpIsOpen, setPopUpIsOpen] = useState(false);

    //some pop-up props are needed!

    const fakeUsers: User[] = [
        {user_id: 1, nickname: "pajac", status: "Need help", position: [70, 70], spawningPoint: 0},
        {user_id: 2, nickname: "debil", status: "I'm busy!", position: [140, 140], spawningPoint: 1},
        {user_id: 3, nickname: "i", status: "Need help", position: [210, 210], spawningPoint: 2},
        {user_id: 4, nickname: "dureń", status: "Coding", position: [280, 280], spawningPoint: 3}
    ];

    const [othersLeft, setOthersLeft] = useState(fakeUsers.map((otherUser) => otherUser.position[0]));
    const [othersTop, setOthersTop] = useState(fakeUsers.map((otherUser) => otherUser.position[1]));


    const euklidean_distance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    const closePopUp = () => { setPopUpIsOpen(false);}

    useEffect(() => {
        for (let otherUserIndex in fakeUsers) {
            if (euklidean_distance(userLeft, userTop, othersLeft[otherUserIndex], othersTop[otherUserIndex]) < USER_PROXIMITY_RANGE) {
                setPopUpIsOpen(true);
            }
        }

        if (euklidean_distance(userLeft, userTop, archive.center[0], archive.center[1]) < OBJECT_PROXIMITY_RANGE) {
            setPopUpIsOpen(true);
        }
    }, [userLeft, userTop, othersLeft, othersTop]);

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(userLeft, userTop);
        let newPosition = 0;
        switch (event.code) {
            case "ArrowUp":
                newPosition = userTop - MOVE_BY;
                if ( newPosition >= 0) {
                    setUserTop(() => newPosition);
                }
                break;

            case "ArrowDown":
                newPosition = userTop + MOVE_BY;
                if (newPosition <= MAX_TOP - AVATAR_SIZE + MOVE_BY) {
                    setUserTop(() => newPosition);
                }
                break;

            case "ArrowLeft":
                newPosition = userLeft - MOVE_BY;
                if (newPosition >= 0) {
                    setUserLeft(() => newPosition);
                }
                break;

            case "ArrowRight":
                newPosition = userLeft + MOVE_BY;
                if (newPosition <= MAX_LEFT - AVATAR_SIZE) {
                    setUserLeft(() => newPosition);
                }
                break;
        }
    };

    return (
        <GeneralContainer>
            <h1>OFFICE</h1>
            <OfficeContainer tabIndex={0} onKeyDown={keyDownHandler}>
                {fakeUsers.map((user, index) => <OthersCircle key={user.user_id} left={othersLeft[index]}
                                                              top={othersTop[index]}>{user.nickname}
                </OthersCircle>)}
                <UserCircle top={userTop} left={userLeft}>{currentUser.nickname.toUpperCase()}</UserCircle>
            </OfficeContainer>
            {popUpIsOpen && <><PopUp onClose={closePopUp} type="chat"/><Backdrop onClick={closePopUp}/></>}
        </GeneralContainer>
    );
}


export const UserCircle = styled.div<MovementProps>`
    background: blue;
    width: ${AVATAR_SIZE}px;
    height: ${AVATAR_SIZE}px;
    border-radius: 50%;
    
    color: white;
    font-size: 11px;
    text-align: center;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`;

export const GeneralContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const OthersCircle = styled.div<MovementProps>`
    background: green;
    width: ${AVATAR_SIZE}px;
    height: ${AVATAR_SIZE}px;
    border-radius: 50%;
    
    color: white;
    font-size: 12px;
    text-align: center;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    position: absolute;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
`;


export const OfficeContainer = styled.div`
  position: absolute;
  top: ${LAYOUT_TOP_OFFSET}px;
  left: ${LAYOUT_LEFT_OFFSET}px;
  
  width: ${MAX_LEFT}px;
  height: ${MAX_TOP}px;
  
  background-image: url(${image});
  
  border: 2px solid black;
  
`;

