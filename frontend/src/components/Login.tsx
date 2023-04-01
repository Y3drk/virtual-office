import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type UserState = "active" | "inactive";

interface User {
  id: number;
  name: string;
  state: UserState;
}

export const Login = () => {
  const [freeUsers, setFreeUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelected = (e: any) => {
    console.log(e.target.value);
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

      <select onChange={handleUserSelected}>
        {freeUsers.map((user) => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      <button>
        <Link to="office">login</Link>
      </button>
    </div>
  );
};
