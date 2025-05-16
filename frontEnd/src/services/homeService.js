import api from "./api";

export const getTotal = async () => {
  const response = await api.get("/total");
  return response.data;
};
