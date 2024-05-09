import React from "react";
import styles from "./Follow.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { URL } from "../../../libs/FormMaterial";
import { adjustingURL } from "../../../libs/FormMaterial";

export default function Follow({ user }) {
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const client = useQueryClient();

  const addFriend = ({ followingId }) => {
    return axios.post(`${URL}/auth/addFriend/${followingId}`, null, {
      withCredentials: true,
    });
  };

  const onSuccess = () => {
    client.invalidateQueries(["post"]);
  };

  const { mutate } = useMutation(addFriend, {
    onSuccess,
  });

  const follow = (followingId) => {
    mutate({ followingId });
  };

  return (
    <>
      <div className={styles.followContainer}>
        <Link to={`/Deshboard/Profile/${user._id}`} className={styles.follow}>
          <div className={styles.img}>
            <img src={adjustingURL(user)} alt="User image" />
          </div>
          <div className={styles.user}>
            <h3>{user?.username}</h3>
            <p>@{user?.username}</p>
          </div>
        </Link>
        <Button buttonFunction={() => follow(user._id)} type={"button"}>
          {user?.followers.includes(_id) ? "following" : "follow"}
        </Button>
      </div>
    </>
  );
}
