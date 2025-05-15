import api from "./api";

export const getAllCategorys = async () => {
  const response = await api.get("/categorys");
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post("/categorys", categoryData);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categorys/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categorys/${id}`);
  return response.data;
};