import axios from "axios";

//const isProd = import.meta.env.PROD;

const api = axios.create({
  baseURL: "https://tendor-project-l7t2.vercel.app/tenders.guru/api/es",
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
