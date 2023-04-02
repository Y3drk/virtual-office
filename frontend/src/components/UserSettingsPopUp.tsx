import styled from "styled-components";
import { UserStatus, UserWithPositions } from "../types/UserTypes";
import { Button } from "../styles";
import { useState } from "react";
import { putUser } from "../config";
import { JsxEmit } from "typescript";

type Props = {
  onClose(): void;
  user: UserWithPositions;
};

export const UserSettingsPopUp = ({ user, onClose }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(null);

  const updateUserStatus = async () => {
    if (selectedStatus) {
      await putUser(user.id, {
        data: selectedStatus,
        field: "status",
      });
      const updatedUser = {
        id: user.id,
        name: user.name,
        state: user.state,
        status: selectedStatus,
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      onClose();
    }
  };

  return (
    <StyledModal>
      <p>user: {user.name}</p>
      <p>current status: {user.status}</p>
      <Select
        onChange={(e: any) => setSelectedStatus(e.target.value)}
        defaultValue={"DEFAULT"}
      >
        <option value="DEFAULT" disabled>
          Select new status
        </option>
        {Object.keys(UserStatus).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <ButtonContainer>
        <Button onClick={onClose}>CLOSE</Button>
        {selectedStatus && <Button onClick={updateUserStatus}>UPDATE</Button>}
      </ButtonContainer>
    </StyledModal>
  );
};

export const StyledModal = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  text-align: center;
  width: 30rem;
  z-index: 10;
  position: fixed;
  top: 20vh;
  left: calc(50% - 15rem);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
`;

const Select = styled.select`
  margin-bottom: 20px;
`;
