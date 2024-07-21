import axios from "./axios";

export const login = async (email, password) => {
  const responce = await axios.post("/api/auth/login", {
    email,
    password,
  });
  return responce.data;
};

export const register = async (firstname, lastname, email, password) => {
  const responce = await axios.post("/api/auth/register", {
    firstname,
    lastname,
    email,
    password,
  });
  return responce.data;
};

export const createTask = async (data) => {
  const responce = await axios.post("/api/task/createTask", data);
  return responce.data;
};

export const getTasks = async () => {
  const responce = await axios.get("/api/task/getTask");
  return responce.data;
};

export const updateTask = async (taskId, data) => {
  const responce = await axios.put(`/api/task/updateTask/${taskId}`, data);
  return responce.data;
};

export const deletTask = async (taskId) => {
  const responce = await axios.delete(`/api/task/deleteTask/${taskId}`);
  return responce.data;
};
