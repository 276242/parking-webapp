import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/parkingspot";

export const assignParkingSpot = async (spotId: number, userId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated.");

    const response = await axios.post(
      `${API_BASE_URL}/assign`,
      { spotId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    console.log(`Assigned spotId: ${spotId} to userId: ${userId}`);
    console.log('Response:', response.data);

    return response.data;
  } catch (error: any) {
    console.error(`Failed to assign spotId: ${spotId} to userId: ${userId}`);
    throw error.response?.data?.message || "Failed to assign parking spot.";
  }
};

export const getAllParkingSpots = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated.");
  
      const response = await axios.get(`${API_BASE_URL}/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to fetch parking spots.";
    }
  };
  
  export const unassignParkingSpot = async (spotId: number, userId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated.");
  
      const response = await axios.post(
        `${API_BASE_URL}/unassign`,
        { spotId, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to unassign parking spot.";
    }
  };
  
  export const releaseParkingSpot = async (spotId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Admin not authenticated.");
  
      const response = await axios.post(
        `${API_BASE_URL}/release`,
        { spotId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to release parking spot.";
    }
  };
  
