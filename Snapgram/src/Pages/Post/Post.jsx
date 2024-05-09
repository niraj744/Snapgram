import React, { useState } from "react";
import styles from "./Post.module.scss";
import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { URL, adjustingURL } from "../../../libs/FormMaterial";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import moment from "moment";
import Button from "../../Components/Button/Button";
import { toast } from "react-toastify";

export default function Post() {
  const [input, setInput] = useState("");
  const client = useQueryClient();
  const { id } = useParams();

  const onSuccess = (data) => {
    client.invalidateQueries(["individualPost", id]);
    setInput("");
    toast.success("Successfully added comment !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const addComment = (data) => {
    return axios.post(
      `${URL}/deshboard/add-comment/${id}`,
      { data },
      {
        withCredentials: true,
      }
    );
  };

  const { mutate } = useMutation(addComment, {
    onSuccess,
  });

  const AddComment = () => {
    mutate({ comment: input });
  };

  const getSinglePost = () => {
    return axios.get(`${URL}/deshboard/get-single-post/${id}`, {
      withCredentials: true,
    });
  };

  const { data, isLoading } = useQuery(["individualPost", id], getSinglePost);

  if (isLoading) {
    return <Loader state={true} />;
  }

  const verifyInput = () => {
    if (/^[a-zA-Z]/.test(input)) {
      input.trim();
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={styles.postContainer}>
        <header className={styles.header}>
          <div className={styles.userContainer}>
            <Link
              to={`/deshboard/profile/${data?.data.singlePost.user._id}`}
              className={styles.user}
            >
              <img
                src={adjustingURL(data?.data.singlePost.user)}
                alt="user image"
              />
              <div className={styles.info}>
                <h3>{data?.data.singlePost.user.username}</h3>
                <div className={styles.uploadeDataAndLocation}>
                  <p>{moment([data?.data.singlePost.createdAt]).fromNow()}</p>
                  <p>{data?.data.singlePost.location}</p>
                </div>
              </div>
            </Link>
          </div>
        </header>
        <div className={styles.postDescription}>
          <p>{data?.data.singlePost.caption}</p>
          <p>{data?.data.singlePost.tags}</p>
        </div>
        <div className={styles.postImage}>
          <img
            src={`http://localhost:3000/${data?.data?.singlePost.image}`}
            alt="post image"
          />
        </div>
        <div className={styles.comments}>
          <ul className={styles.ul}>
            {data?.data.singlePost.comments.map((comments) => {
              return (
                <li key={comments._id} className={styles.li}>
                  <Link
                    to={`/Deshboard/Profile/${comments.user._id}`}
                    className={styles.user}
                  >
                    <img src={adjustingURL(comments?.user)} alt="user image" />
                    <div className={styles.info}>
                      <h3>{comments?.user?.username}</h3>
                      <div className={styles.uploadeDataAndLocation}>
                        <p>{comments.comment}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.sticky}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type something"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {verifyInput() && (
              <Button buttonFunction={AddComment}>add comment</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
