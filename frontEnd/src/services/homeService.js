import api from "./api";

export const getTotal = async () => {
  const response = await api.get("/dashboard/count");
  return response.data;
};

export const getVehicleRecent = async () => {
  const response = await api.get("/dashboard/vehicle-recent");
  return response.data;
};