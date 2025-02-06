import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/auth";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Login failed";
  }
};
