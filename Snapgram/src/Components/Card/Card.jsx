import React from "react";
import styles from "./Card.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL, adjustingURL } from "../../../libs/FormMaterial";
import { useMutation, useQueryClient } from "react-query";

export default function Card({ cardProps }) {
  const navigate = useNavigate();
  const client = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));

  const savePost = (data) => {
    return axios.post(`${URL}/deshboard/save/${data.postId}`, null, {
      withCredentials: true,
    });
  };

  const likesPost = (data) => {
    return axios.post(`${URL}/deshboard/like`, data, {
      withCredentials: true,
    });
  };

  const onSuccess = (data) => {
    client.invalidateQueries(["post"]);
  };

  const { mutate: mutateSave } = useMutation(savePost, {
    onSuccess,
  });

  const { mutate } = useMutation(likesPost, {
    onSuccess,
  });

  const likes = (postId) => {
    mutate({ postid: postId, userid: user._id });
  };

  const save = (postId) => {
    mutateSave({ postId });
  };

  return (
    <>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.userContainer}>
            <Link to={`Profile/${cardProps.user._id}`} className={styles.user}>
              <img
                src={adjustingURL(cardProps.user)}
                alt="user image"
                loading="lazy"
              />
              <div className={styles.info}>
                <h3>{cardProps?.user.username}</h3>
                <div className={styles.uploadeDataAndLocation}>
                  <p>{new Date(cardProps.createdAt).toDateString()}</p>
                  <p>{cardProps?.location}</p>
                </div>
              </div>
            </Link>
          </div>
        </header>
        <Link to={`Post/${cardProps._id}`} className={styles.userPost}>
          <div className={styles.postDescription}>
            <p>{cardProps?.caption}</p>
            <p>{cardProps?.tags}</p>
          </div>
          <div className={styles.img}>
            <img
              src={`http://localhost:3000/${cardProps?.image}`}
              alt="post image"
              loading="lazy"
              srcSet=" /signup.png (max-width : 578) 40vw"
            />
          </div>
        </Link>
        <div className={styles.links}>
          <ul className={styles.socialContainer}>
            <li
              onClick={() => likes(cardProps._id)}
              className={styles.socialLinks}
            >
              <span>
                {cardProps?.likespost?.includes(user._id) ? (
                  <ion-icon
                    name="heart-sharp"
                    style={{ color: "rgb(249, 24, 128)" }}
                  ></ion-icon>
                ) : (
                  <ion-icon name="heart-outline"></ion-icon>
                )}
              </span>
              <span>{cardProps?.likespost?.length}</span>
            </li>
            <li className={styles.socialLinks}>
              <span
                onClick={() => navigate(`/Deshboard/Post/${cardProps._id}`)}
              >
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
              <span>{cardProps?.comments.length}</span>
            </li>
            <li className={styles.socialLinks}>
              <span onClick={() => save(cardProps._id)}>
                <ion-icon name="bookmark-outline"></ion-icon>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
