import React, { createContext, useContext, useState, useEffect } from "react";
import { ACCESS_TOKEN, IS_ADMIN, REFRESH_TOKEN, TABLE_NUMBER } from "~/constants";
import api, { authAPI } from "~services/api";

interface AuthContextData {
  user: any;
  isAuthenticated: boolean;
  isAdmin: boolean;
  tableNumber: string | null;
  setTableNumber: (tableNumber: string | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  showTableModal: boolean;
  setShowTableModal: (showTableModal: boolean) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const tableNumberStorage = localStorage.getItem(TABLE_NUMBER);
  const [showTableModal, setShowTableModal] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await authAPI.login({ email, password });
      localStorage.setItem(ACCESS_TOKEN, data.access);
      localStorage.setItem(REFRESH_TOKEN, data.refresh);

      const userResponse = await api.get("users/me/");
      setUser(userResponse.data);
      setIsAdmin(userResponse.data.is_admin);
      setIsAuthenticated(true);
      localStorage.setItem(IS_ADMIN, userResponse.data.is_admin);
      console.log('userResponse', userResponse)
      console.log('userResponse.data.is_admin', userResponse.data.is_admin)
      return userResponse.data.is_admin;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(IS_ADMIN);
    localStorage.removeItem(TABLE_NUMBER);
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        return;
      }

      try {
        const response = await api.get("users/me/");
        setUser(response.data);
        setIsAuthenticated(true);
        setIsAdmin(response.data.is_admin);
      } catch (error) {
        console.error("Error fetching user:", error);
        logout(); // Call logout to clear invalid session
      }
    };

    fetchUser(); // Call the async function inside the useEffect
  }, []);


  useEffect(() => {
    setTableNumber(tableNumberStorage);
  }, [tableNumberStorage]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        logout,
        tableNumber,
        setTableNumber,
        showTableModal,
        setShowTableModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
