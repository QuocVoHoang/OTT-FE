import axios from "axios";
import { API_SERVER } from "../constants";

export const registerUserByEmail = async (email?: string, password?: string) => {
  try {
    const response = await axios.post(`${API_SERVER}/user/create-user/email`, {
      email,
      password
    });
    
    handleLogin(email!, password!)
  } catch (error) {
    throw new Error("Registration failed");
  }
};


//////////////////////////////////////////////////////
const fetchProtectedData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("There is no token")
    return
  }

  try {
    const response = await axios.get(`${API_SERVER}/user/protected-route/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(error);
  }
};


export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_SERVER}/user/login-email/`, { email, password });
    const { idToken } = response.data;

    localStorage.setItem("token", idToken);

    fetchProtectedData()

    window.location.href = "/"
  } catch (err: any) {
    console.error(err.response?.data?.detail || "Login failed.");
  }
}

export const handleLogout = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/signin"
    return;
  }

  try {
    await axios.post(`${API_SERVER}/user/logout/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    localStorage.removeItem("token")
    window.location.href = "/signin"
  }
};
