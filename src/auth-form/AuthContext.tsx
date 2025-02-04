import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParkingClient } from "../api/ParkingClient";
import { jwtDecode } from 'jwt-decode';
interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const apiClient = new ParkingClient();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token) as User);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiClient.login({ username, password });
      if (response) {
        localStorage.setItem("token", response.token || "");
        if (response.token) {
          setUser(jwtDecode(response.token) as User);
        }
        navigate("/history");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};