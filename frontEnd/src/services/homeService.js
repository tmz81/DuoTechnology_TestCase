import api from "./api";

export const getTotal = async () => {
  const response = await api.get("/total");
  console.log(response)
  return response.data;
};
