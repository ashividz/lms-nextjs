import { userType } from "@/types/user-type";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

// Create the context
interface UserContextType {
  userData: userType | null;
  updateUser: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// User provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<userType | null>(null);

  const updateUser = () => {
    fetchUserData();
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/user");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array ensures that useEffect runs only once after initial render

  const value: UserContextType = {
    userData,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
