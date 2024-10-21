import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      if (response.data.status === "success") {
        localStorage.setItem("alhikmah-token", response.data.access_token);
        setLoading(false);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
        },
      });

      if (response.data.status) {
        localStorage.removeItem("alhikmah-token");
        setUser(null);
        alert("Berhasil Logout!");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
        },
      });
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const register = async ({
    name,
    email,
    username,
    noHp,
    password,
    repassword,
    alamat,
  }) => {
    setLoading(true);
    const response = await axios.post("http://localhost:8000/api/register", {
      name,
      username,
      email,
      no_hp: noHp,
      password,
      repassword,
      alamat,
    });
    if (response?.data?.status === "success") {
      //
      localStorage.setItem("alhikmah-token", response.data.access_token);
      setLoading(false);
      return response.data;
    }
  };

  return { user, login, logout, register, loading, setLoading };
};

export default useAuth;
