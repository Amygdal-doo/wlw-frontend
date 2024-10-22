import { useState, useEffect } from "react";
import { IToken } from "../interfaces/token.interface";
import { LOCAL_STORAGE } from "../const/local-storage";
import  getItemFromLocalStorage  from "../utils/getItemFromLocalStorage";
import  setItemToLocalStorage  from "../utils/setItemToLocalStorage";

export default function useToken(): {
  setToken: (token: IToken | null) => void;
  token: IToken | null;
} {
  // Retrieve the token from localStorage
  const getToken = (): IToken | null => {
    return getItemFromLocalStorage<IToken>(LOCAL_STORAGE.TOKEN);
  };

  const [token, setToken] = useState<IToken | null>(getToken());

  // Function to save the token to localStorage and update state
  const saveToken = (userToken: IToken | null) => {
    setToken(userToken); // Update state first
    if (userToken) {
      // Save token to localStorage
      setItemToLocalStorage(LOCAL_STORAGE.TOKEN, userToken);
    } else {
      // Remove token if null
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    }
  };

  // Synchronize the token with localStorage on initialization
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return {
    setToken: saveToken,
    token,
  };
}
