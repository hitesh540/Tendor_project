import axios from "axios";

// Axios instance for potential future reuse
const api = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
});

export const fetchTenders = async () => {
  try {
    const response = await api.get("/tenders");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tenders:", error);
    throw error;
  }
};

export const fetchTenderDetails = async (id: number) => {
  try {
    const response = await api.get(`/tenders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tender with ID ${id}:`, error);
    throw error;
  }
};
