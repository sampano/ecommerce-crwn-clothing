import { useState, useEffect } from "react";
import { createContext } from "react";
import { useFetcher } from "react-router-dom";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setcurrentUser: () => null, //blank function
});

export const UserProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const value = { currentUser, setcurrentUser };

  useEffect(() => {
    const unsubsribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setcurrentUser(user);
    });
    return unsubsribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
