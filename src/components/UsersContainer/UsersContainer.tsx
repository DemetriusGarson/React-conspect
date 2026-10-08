import { useState } from 'react';
import type { User } from '../types/User';
import Button from '../Button/Button';

interface UsersContainerProps {
  users?: User[];
}

export default function UsersContainer({
  users: usersProps = [],
}: UsersContainerProps) {
  const [users, setUsers] = useState<User[]>(usersProps);

  const [user, setUser] = useState<User | null>(users[0] || null);

  const addUserHandler = () => {
    setUsers([...users, { name: `User№: ${users.length + 1}` }]);
  };

  const chooseUserHandler = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;
    const li = target.closest('li');
    if (!li) {
      return;
    }
    const chosenUserName = li?.dataset.user;
    const chosenUser = users.find((user) => user.name === chosenUserName);
    if (!chosenUser) {
      return;
    }
    setUser(chosenUser);
  };
  return (
    <>
      <p>{`Total users: ${users.length}`}</p>
      {!user ? <p>No User</p> : <p>{`Current User: ${user.name}`}</p>}
      <Button text="Add User" onClick={addUserHandler} />
      <ul onClick={chooseUserHandler}>
        {users.map((user) => (
          <li key={user.name} data-user={user.name}>
            <p>{user.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
