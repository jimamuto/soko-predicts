import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api";

export const api = axios.create({
  baseURL,
});

export const createPrediction = (data) => 
  api.post("/predictions", data); 

export const getPredictions = () => 
  api.get("/predictions");