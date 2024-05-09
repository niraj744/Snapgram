import React from "react";
import styles from "./Navigation.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adjustingURL, links, URL } from "../../../libs/FormMaterial";
import { useMutation } from "react-query";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

export default function Navigation() {
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

  const location = useLocation().pathname;
  const User = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    mutate(User._id);
  };

  if (isLoading) {
    <Loader state={isLoading} />;
  }

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link to={"/Deshboard"}>
              <img src="/logo.svg" alt="website logo" />
            </Link>
          </div>
          <div className={styles.userContainer}>
            <Link to={`profile/${User._id}`} className={styles.user}>
              <img src={adjustingURL(User)} alt="user image" />
              <div className={styles.info}>
                <h3>{User?.username}</h3>
                <p>@{User?.username}</p>
              </div>
            </Link>
          </div>
          <div className={styles.href}>
            <ul>
              {links.map((links) => {
                return (
                  <li key={links.name}>
                    <Link
                      to={links.link}
                      className={location == links.link ? styles.active : null}
                    >
                      <span>
                        <ion-icon
                          name={
                            location == links.link
                              ? links.activeIcon
                              : links.icon
                          }
                        ></ion-icon>
                      </span>
                      <span>{links.name}</span>
                    </Link>
                  </li>
                );
              })}
              <li className={styles.logout} onClick={logout}>
                <span>
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span>logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
