import React, { createContext, useState, FC } from 'react';

// Define a type for the user and a type for the context
interface User {
  username: string;
  category: string;
  id: string;
}

interface UserContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Define the initial state
const initialUser: User = {
  username: '',
  category: '',
  id: '',
};

// Create the context
const UserContext = createContext<UserContextProps>({
  user: initialUser,
  setUser: () => void,
});

// Create a provider for the context
export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
