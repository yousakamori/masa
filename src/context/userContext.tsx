import React, { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/client";
import { User } from "../types";

type ContextProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loadingUser: boolean;
};

export const UserContext = createContext({} as ContextProps);

export type UserContextCompProps = {
  children: React.ReactNode;
};

export const UserContextComp: React.VFC<UserContextCompProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          setUser({ uid, displayName, email, photoURL });
        } else setUser(null);
      } catch (error) {
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
