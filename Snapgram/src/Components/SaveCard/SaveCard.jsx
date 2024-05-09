import React from "react";
import { Link } from "react-router-dom";
import styles from "./SaveCard.module.scss";
import { adjustingURL } from "../../../libs/FormMaterial";

export default function SaveCard({ post }) {
  const User = post.user;

  return (
    <>
      <div className={styles.save}>
        <Link to={`/deshboard/post/${post?._id}`} className={styles.link}>
          <img src={`http://localhost:3000/${post?.image}`} alt="save post" />
        </Link>
        <div className={styles.grid_user}>
          <img src={adjustingURL(User)} alt="user image" />
        </div>
      </div>
    </>
  );
}
