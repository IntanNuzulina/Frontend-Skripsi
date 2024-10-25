import { BASE_URL } from "@/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { SwalTopEnd } from "@/components/MySwal";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);
  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL + "/login", {
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
      const response = await axios.get(BASE_URL + "/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("alhikmah-token")}`,
        },
      });

      if (response.data.status) {
        localStorage.removeItem("alhikmah-token");
        setUser(null);
        SwalTopEnd({
          title: "Success!",
          icon: "success",
          text: "Berhasil Logout!",
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL + "/user", {
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
    const response = await axios.post(BASE_URL + "/register", {
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
