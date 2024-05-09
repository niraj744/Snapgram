import React from "react";
import styles from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Loader from "../Loader/Loader";
import axios from "axios";
import { URL, adjustingURL } from "../../../libs/FormMaterial";

export default function Header() {
  const navigate = useNavigate();

  const Logout = (data) => {
    return axios.post(`${URL}/auth/Log-out`, data, {
      withCredentials: true,
    });
  };

  const onSuccess = (data) => {
    if (data.data.success) {
      toast.success(data.data.success, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/");
      localStorage.removeItem("user");
    } else {
      toast.error(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const { mutate, isLoading } = useMutation(Logout, {
    onSuccess,
  });

  const User = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    mutate(User._id);
  };

  if (isLoading) {
    <Loader state={isLoading} />;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={"/Deshboard"}>
            <img src="/logo.svg" alt="website logo" />
          </Link>
        </div>
        <div className={styles.Userinfo}>
          <span onClick={logout}>
            <ion-icon name="log-out-outline"></ion-icon>
          </span>
          <Link
            to={`/Deshboard/Profile/${User._id}`}
            className={styles.userImg}
          >
            <img src={adjustingURL(User)} alt="User image" />
          </Link>
        </div>
      </header>
    </>
  );
}
