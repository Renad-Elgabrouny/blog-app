import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL= "http://localhost:3000/users";

export const register = async (userData) => {
  const response = await axios.post(`http://localhost:3000/register`, userData);

  localStorage.setItem("token", response.data.accessToken);

  return response.data;
};

export const login = async (userData) => {
  console.log(userData);
  const response = await axios.post(`http://localhost:3000/login`, userData);
  localStorage.setItem("token", response.data.accessToken);
  return response.data;
};

export const getUserById=async (id)=>{
  const response = await axios.get(`${baseURL}/${id}`);
  return response.data;
}


export const getCurrentUser = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  return jwtDecode(token);
};

export const logout=()=>{
  localStorage.removeItem("token")
}