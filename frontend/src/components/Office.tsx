import React, {useEffect, useState} from "react";
import styled from "styled-components";
import locations from "../assets/locations.json";
import {ClientsideUser, UserStatus} from "../other/UserDatamodel";
import {PopUp, PopUpType} from "./PopUp";
import {Backdrop} from "./Backdrop";
import image from "../assets/office_5.jpg";

import {Link, Outlet, useNavigate} from "react-router-dom";
import {User} from "../types";
import {getUsers, putUser} from "../config";
import {Button} from "../styles";

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

    const [currentMappedUser, setCurrentMappedUser] = useState<ClientsideUser | null>(null);

    const [userLeft, setUserLeft] = useState(0);
    const [userTop, setUserTop] = useState(0);

    const [popUpType, setPopUpType] = useState<PopUpType>("chat");


    const [clientsideUsers, setClientsideUsers] = useState<ClientsideUser[]>([]);
    const [othersLeft, setOthersLeft] = useState<number[]>([]);
    const [othersTop, setOthersTop] = useState<number[]>([]);

    const [popUpIsOpen, setPopUpIsOpen] = useState(false);

    const getLoggedUsers = async () => {
        const loggedInUser = sessionStorage.getItem("user");
        const users = await getUsers("LOGGED");

        if (loggedInUser) {
            const parsedLoggedIn = JSON.parse(loggedInUser);

            setCurrentMappedUser({...parsedLoggedIn, spawningPoint: 0, position: [0,0]});
            const tmp = mapDBUsersToClientside(users, parsedLoggedIn);
            setClientsideUsers(tmp);
            setOthersLeft(tmp.map((user, index) => desks[index].center[0]));
            setOthersTop(tmp.map((user, index) => desks[index].center[1]));
        }
    };

    const mapDBUsersToClientside = (users: User[], currentUser2: User) => {
        const results: ClientsideUser[] = []
        users.map((user, index) => { if (user.name !== currentUser2.name) {
            results.push({...user, spawningPoint: index, position: [0,0]})
        }})
        return results;
    };

    const navigate = useNavigate();

    const logoutUser = async () => {
        if (currentMappedUser) {
            const response = await putUser(currentMappedUser.id, "NOT_LOGGED");
            navigate("..");
            return response;
        }
    };


    const euklidean_distance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    const closePopUp = () => {
        setPopUpIsOpen(false);
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        let newPosition = 0;
        switch (event.code) {
            case "ArrowUp":
                newPosition = userTop - MOVE_BY;
                if (newPosition >= 0) {
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

    useEffect(() => {
        getLoggedUsers()
    }, [])


    useEffect(() => {
        for (let idx in clientsideUsers) {
            if (euklidean_distance(userLeft, userTop, othersLeft[idx], othersTop[idx]) < USER_PROXIMITY_RANGE) {
                setPopUpIsOpen(true);
                setPopUpType("chat");
            }
        }

        if (euklidean_distance(userLeft, userTop, archive.center[0], archive.center[1]) < OBJECT_PROXIMITY_RANGE) {
            setPopUpIsOpen(true);
            setPopUpType("archive");
        }
    }, [userLeft, userTop, othersLeft, othersTop]);

    return (
        <>
            {currentMappedUser &&
                (<GeneralContainer>
                        <DataRow>
                            <h3>User from local storage: {currentMappedUser.name}</h3>
                            <Button onClick={logoutUser}>Logout</Button>
                        </DataRow>
                        <OfficeContainer tabIndex={0} onKeyDown={keyDownHandler}>
                            
                            {clientsideUsers.map((user, index) => <OthersCircle key={user.id}
                                                                                left={othersLeft[index]}
                                                                                top={othersTop[index]}>{user.name}
                            </OthersCircle>)}
                            <UserCircle top={userTop}
                                        left={userLeft}>{currentMappedUser.name.toUpperCase()}</UserCircle>
                        </OfficeContainer>
                        {popUpIsOpen && <><PopUp type={popUpType} onClose={closePopUp} /><Backdrop onClick={closePopUp}/></>}
                    </GeneralContainer>
                )}
        </>);

};

const DataRow = styled.div`
  margin-bottom: 30px;
`;

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

export const ChatButton = styled.div`
  width: 6rem;
  height: 20%;
  margin-left: 40%;
  background: green;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
