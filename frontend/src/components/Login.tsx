import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../types";

export const Login = () => {
  const [freeUsers, setFreeUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // save selected user to local storage
  const handleUserSelected = (e: any) => {
    localStorage.setItem("user", e.target.value);
    setSelectedUser(e.target.value);
  };

  useEffect(() => {
    // basic data setup
    const user1: User = {
      id: 1,
      name: "user1",
      state: "inactive",
    };

    const user2: User = {
      id: 2,
      name: "user2",
      state: "inactive",
    };

    const user3: User = {
      id: 3,
      name: "user3",
      state: "inactive",
    };

    const users = [user1, user2, user3];
    setFreeUsers(users);
  }, []);

  return (
    <div>
      <p>Login page</p>

      {freeUsers.length ? (
        <div>
          <select onChange={handleUserSelected} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled>
              Select your option
            </option>
            {freeUsers.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUser && (
            <button>
              <Link to="office">login</Link>
            </button>
          )}
        </div>
      ) : (
        <p>All users are logged in!</p>
      )}
    </div>
  );
};
