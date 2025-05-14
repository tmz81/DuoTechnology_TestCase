import api from "./api";

export const getAllVehicles = () => api.get("/vehicles");
