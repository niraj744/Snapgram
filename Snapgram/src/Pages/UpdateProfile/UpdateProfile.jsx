import React, { useRef, useState } from "react";
import styles from "./UpdateProfile.module.scss";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { URL, adjustingURL } from "../../../libs/FormMaterial";
import { useQuery, useMutation } from "react-query";
import Loader from "../../Components/Loader/Loader";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
  });

  const input = useRef();

  const UpdateProfile = (data) => {
    return axios.patch(`${URL}/auth/update_profile`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const Onsuccess = (data) => {
    navigate("/Deshboard");
    localStorage.setItem("user", JSON.stringify(data?.data?.NewUser));
    toast.success("Successfully profile updated !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const { mutate } = useMutation(UpdateProfile, {
    onSuccess: Onsuccess,
  });

  const getUser = () => {
    return axios.get(`${URL}/auth/updateprofile`, {
      withCredentials: true,
    });
  };

  const onSuccess = (data) => {
    const user = data?.data?.user;
    setFormData({
      username: user.username,
      lastname: user.lastname,
      email: user.email,
    });
  };

  const { data, isLoading } = useQuery(["getUser"], getUser, {
    onSuccess,
  });

  if (isLoading) {
    return <Loader state={true} />;
  }

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onsubmit = (e) => {
    e.preventDefault();
    const newObj = { ...formData, avatar };

    mutate(newObj);
  };

  return (
    <>
      <div className={styles.updateProfileContainer}>
        <div className={styles.heading}>
          <h1>
            <ion-icon name="clipboard-outline"></ion-icon>
          </h1>
          <h1>edit profile</h1>
        </div>
        <div className={styles.form}>
          <form className={styles.form} onSubmit={onsubmit}>
            <div className={styles.userPhoto}>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                id="avatar"
                file={avatar}
                onChange={(e) => setAvatar(e.target.files[0])}
                ref={input}
                hidden
              />
              <img src={adjustingURL(data?.data?.user)} alt="user image" />
              <span onClick={() => input.current.click()}>
                change profile photo
              </span>
            </div>

            <div className={styles.formField}>
              <label htmlFor="username">Name</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={change}
                value={formData.username}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                onChange={change}
                value={formData.lastname}
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={change}
                disabled
                value={formData.email}
              />
            </div>

            <div className={styles.button}>
              <Link to={"/Deshboard"} className={styles.cancel}>
                <button>cancel</button>
              </Link>
              <Button type="submit">Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
