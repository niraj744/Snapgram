import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { URL, adjustingURL, tabs } from "../../../libs/FormMaterial";
import SaveCard from "../../Components/SaveCard/SaveCard";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("posts");

  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const GetUser = async () => {
    return axios.get(`${URL}/deshboard/get-single-user/${id}`, {
      withCredentials: true,
    });
  };

  const { data, isLoading } = useQuery(["user", id], GetUser);

  if (isLoading) {
    return <Loader state={true} />;
  }

  const User = data?.data.singleUser;

  const changeTab = (activetab) => {
    setActiveTab(activetab);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.userContainer}>
          <img src={adjustingURL(User)} alt="user image" />
          <div className={styles.user}>
            <div className={styles.followAnduser}>
              <div className={styles.username}>
                <h1>{User?.username}</h1>
                <p>@{User?.username}</p>
              </div>
              <div className={styles.followers}>
                <ul className={styles.ul}>
                  <li className={styles.li}>
                    <span>{User?.posts?.length}</span>
                    <span>posts</span>
                  </li>
                  <li className={styles.li}>
                    <span>{User?.followers?.length}</span>
                    <span>followers</span>
                  </li>
                  <li className={styles.li}>
                    <span>{User?.following?.length}</span>
                    <span>following</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.button}>
              {user?._id == User?._id ? (
                <Link
                  to={`/Deshboard/Update-Profile/${User._id}`}
                  className={styles.editButton}
                >
                  <span>
                    <ion-icon name="create-outline"></ion-icon>
                  </span>
                  <span>edit profile</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.tabs}>
          <ul className={styles.ul}>
            {tabs.map((tabs) => {
              return (
                <li
                  key={tabs.tabName}
                  onClick={() => changeTab(tabs.tabName)}
                  className={styles.li}
                  style={{
                    background:
                      activeTab == tabs.tabName ? "rgb(49 49 50)" : null,
                  }}
                >
                  <span>
                    <ion-icon name={tabs.icon}></ion-icon>
                  </span>
                  <span>{tabs.tabName}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.post}>
          <ul className={styles.ul}>
            {activeTab == "posts"
              ? User?.posts.map((posts) => {
                  return (
                    <li key={posts._id} className={styles.li}>
                      <SaveCard post={posts} />
                    </li>
                  );
                })
              : User?.likes.map((likes) => {
                  return (
                    <li key={likes._id} className={styles.li}>
                      <SaveCard post={likes} />
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </>
  );
}
