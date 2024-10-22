import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService";
import { IUser } from "core/interfaces/user.interface";
import useToken from "core/hooks/useToken";
import { IToken } from "core/interfaces/token.interface";
import { tokenService } from "core/services/tokenService";
import clearLocalStorage from "core/utils/clearLocalStorage";
import { useNavigate } from "@remix-run/react";

interface IAuthContextProps {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<IAuthContextProps>({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  fetchUser: async () => {},
});

// AuthProvider component
export const AuthProvider: FC<PropsWithChildren<object>> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const { token, setToken } = useToken(); // Using the custom hook to manage token
  const [loading, setLoading] = useState<boolean>(false);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await apiService.post("auth/login", {
        email,
        password,
      });

      const userToken = response.data as IToken;

      // Store token using both tokenService and setToken
      tokenService.token = userToken; // Use TokenService to store token in localStorage
      setToken(response.data); // Update useToken state

      // Fetch the user data after login
      console.log("token 0000", token);

      await fetchUser();

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (
    email: string,
    password: string,
    username: string
  ) => {
    setLoading(true);
    try {
      await apiService.post("auth/register", { email, password, username });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null); // Clear token in local state
    tokenService.clear(); // Clear token in TokenService
    clearLocalStorage(); // Clear local storage if needed
    navigate("/"); // Redirect to login
  };

  // Fetch user information based on the current token
  const fetchUser = async () => {
    console.log("token 1111", token);

    if (!token) return; // No token, exit early

    setLoading(true);
    try {
      const response: AxiosResponse<IUser> = await apiService.get("user/me", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      console.log("token 22222", token);
      setUser(response.data); // Set user information
    } catch (error) {
      console.error("Fetch user error:", error);
      logout(); // Logout if there's an error fetching user data
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch user info if a token is present
  useEffect(() => {
    if (token) {
      fetchUser(); // Fetch user details when the token changes
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
