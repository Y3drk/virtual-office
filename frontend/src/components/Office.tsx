import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import locations from "../assets/locations.json";
import image from "../assets/office_5.jpg";

import { Link, Outlet, useNavigate } from "react-router-dom";
// import {ClientsideUser} from "../other/UserDatamodel";
import { Backdrop } from "./Backdrop";

import {
  StompSessionProvider, useStompClient,
  useSubscription
} from "react-stomp-hooks";
import { json } from "stream/consumers";

import { PopUp, PopUpType } from "./PopUp";

import { UserWithPositions, User } from "../types";
import { getUsers, putUser } from "../config";
import { Button } from "../styles";
import { UserSettingsPopUp } from "./UserSettingsPopUp";

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

  const [currentMappedUser, setCurrentMappedUser] = useState<UserWithPositions | null>(
    null
  );

  const [userLeft, setUserLeft] = useState(0);
  const [userTop, setUserTop] = useState(0);

  const [popUpType, setPopUpType] = useState<PopUpType>("chat");

  const [clientsideUsers, setClientsideUsers] = useState<UserWithPositions[]>([]);

  const [othersLeft, setOthersLeft] = useState<number[]>([]);
  const [othersTop, setOthersTop] = useState<number[]>([]);

  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  const [settingsIsOpen, setSettingsIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();


  let clientRef: { sendMessage: (arg0: string, arg1: string | Object) => void; } | null = null;

  const getLoggedUsers = async () => {
    const loggedInUser = sessionStorage.getItem("user");
    const users = await getUsers("LOGGED");

    if (loggedInUser) {
      const parsedLoggedIn = JSON.parse(loggedInUser);

      setCurrentMappedUser({ ...parsedLoggedIn, spawningPoint: 0, position: [0, 0] });
      const tmp = mapDBUsersToClientside(users, parsedLoggedIn);
      setClientsideUsers(tmp);
      setOthersLeft(tmp.map((user, index) => desks[user.id].center[0]));
      setOthersTop(tmp.map((user, index) => desks[user.id].center[1]));
    }
  };


  const mapDBUsersToClientside = (users: User[], currentUser2: User) => {
    const results: UserWithPositions[] = [];
    users.map((user, index) => {
      if (user.name !== currentUser2.name) {
        results.push({ ...user, spawningPoint: index, position: [0, 0] });
      }
    });
    return results;
  };

  const logoutUser = async () => {
    if (currentMappedUser) {
      const response = await putUser(currentMappedUser.id, {
        data: "NOT_LOGGED",
        field: "state"
      });
      navigate("..");
      return response;
    }
  };


  const parseCoordinatesToJson = (x: number, y: number, id: number) => {
    return JSON.stringify({ xCoordinate: x, yCoordinate: y, userId: id });
  };

  const parseResponse = (body: string) => {
    const newLefts = [];
    const newTops = [];
    const jsonObj = JSON.parse(body);
    for (let idx in jsonObj) {
      if (parseInt(idx) != currentMappedUser?.id) {
        // console.log("Whole object", jsonObj[idx]);
        // console.log("id from json | curr user:", idx, currentMappedUser?.id);
        // console.log("Try of xCoordinate", jsonObj[idx].xcoordinate);
        // console.log(jsonObj[idx].yCoordinate, jsonObj[idx].xCoordinate);
        newLefts.push(jsonObj[idx].xcoordinate);
        newTops.push(jsonObj[idx].ycoordinate);
      }
    }
    if (newLefts.length > clientsideUsers.length) { //should happen once
      getLoggedUsers();
    }
    return [newLefts, newTops];
  };

  const closePopUp = () => {
    setPopUpIsOpen(false);
  };

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

  const euklidean_distance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  };

  useEffect(() => {
    getLoggedUsers();
  }, []);

  useEffect(() => {
    if (euklidean_distance(userLeft, userTop, archive.center[0], archive.center[1]) < OBJECT_PROXIMITY_RANGE) {
      setPopUpIsOpen(true);
      setPopUpType("archive");
    }

    for (let idx in clientsideUsers) {
      if (euklidean_distance(userLeft, userTop, othersLeft[idx], othersTop[idx]) < USER_PROXIMITY_RANGE) {
        setPopUpIsOpen(true);
        setPopUpType("chat");
      }
    }

  }, [userLeft, userTop, othersLeft, othersTop]);


  return (
    <>
      {currentMappedUser &&
        (
          <StompSessionProvider
            url={"/socket"}
            // debug={STOMP => console.log({STOMP})}
            // onConnect={() => console.log({STOMP_CONNECT: 'TCP connection successfully established'})}
          >
            <GeneralContainer>
              <DataRow>
                <h3>User from local storage: {currentMappedUser.name}</h3>
                <Button onClick={logoutUser}>Logout</Button>
              </DataRow>
              <OfficeContainer tabIndex={0} onKeyDown={keyDownHandler}>
                {clientsideUsers.map((user, index) => (
                  <UserSpace top={othersTop[index]} left={othersLeft[index]} key={user.id}>
                    <UserSettings>{user.status}</UserSettings>
                    <OthersCircle>{user.name}</OthersCircle>
                  </UserSpace>
                ))}
                <UserSpace top={userTop} left={userLeft}>
                  <UserSettings onClick={() => setSettingsIsOpen(true)}>
                    {currentMappedUser.status}
                  </UserSettings>
                  <UserCircle>{currentMappedUser.name.toUpperCase()}</UserCircle>
                </UserSpace>
              </OfficeContainer>
              {popUpIsOpen && <><PopUp type={popUpType} onClose={closePopUp} /><Backdrop onClick={closePopUp} /></>}
              {settingsIsOpen && (
                <UserSettingsPopUp
                  onClose={() => {
                    setSettingsIsOpen(false);
                    getLoggedUsers();
                  }}
                  user={currentMappedUser}
                />
              )}
            </GeneralContainer>
            <SendingComponent parser={parseCoordinatesToJson} userLeft={userLeft} userTop={userTop}
                              userId={currentMappedUser?.id} />
            <SubscribingComponent parser={parseResponse} setOthersLeft={setOthersLeft} setOthersTop={setOthersTop} />
          </StompSessionProvider>
        )}
    </>);
};

export type SenderProps = {
  userLeft: number;
  userTop: number;
  userId: number;
  parser: (x: number, y: number, id: number) => string;
}

export type SubscriberProps = {
  setOthersLeft: Dispatch<SetStateAction<number[]>>;
  setOthersTop: Dispatch<SetStateAction<number[]>>;
  parser: (body: string) => number[][];
}


const SendingComponent = (props: SenderProps) => {
  const stompClient = useStompClient();

  const sendMessage = () => {
    // console.log("SENDING");
    // console.log(props.parser(props.userLeft, props.userTop, props.userId));
    if (stompClient) {
      //Send Message
      stompClient.publish({
        destination: "/app/positions",
        body: props.parser(props.userLeft, props.userTop, props.userId)
      });
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    sendMessage();
  }, [props.userLeft, props.userTop]);

  return <></>;

};

const SubscribingComponent = (props: SubscriberProps) => {

  useSubscription("/topic/positions", (message) => {
    // console.log("RECEIVED:", message.body);
    const newCords = props.parser(message.body);
    console.log("Parsed new Cords", newCords);
    props.setOthersLeft(newCords[0]);
    props.setOthersTop(newCords[1]);
  });

  return (
    <></>
  );
};

const DataRow = styled.div`
  margin-bottom: 30px;
`;

const UserSpace = styled.div<MovementProps>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

export const UserCircle = styled.div`
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
`;

const UserSettings = styled.button`
  background: white;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE / 2}px;
  border: 2px solid black;
  border-radius: 10px;

  color: black;
  font-size: 11px;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GeneralContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const OthersCircle = styled.div`
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
