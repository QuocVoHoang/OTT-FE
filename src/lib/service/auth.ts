import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"

export const registerUserByEmail = async (email?: string, password?: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/create-user/email`, {
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
    const response = await axios.get(`${API_BASE_URL}/user/protected-route/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(error);
  }
};


export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login-email/`, { email, password });
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
    await axios.post(`${API_BASE_URL}/user/logout/`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    console.error("Logout error:", error)
  } finally {
    localStorage.removeItem("token")
    window.location.href = "/signin"
  }
};
