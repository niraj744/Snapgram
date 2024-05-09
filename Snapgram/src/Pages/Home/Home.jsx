import React from "react";
import styles from "./Home.module.scss";
import Card from "../../Components/Card/Card";
import Follow from "../../Components/Follow/Follow";
import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../../../libs/FormMaterial";
import Loader from "../../Components/Loader/Loader";

export default function Home() {
  const FetchPost = () => {
    return axios.get(`${URL}/deshboard/get-post`, {
      withCredentials: true,
    });
  };

  const { data, isLoading } = useQuery(["post"], FetchPost);

  if (isLoading) {
   return <Loader state={true} />;
  }

  return (
    <>
      <section className={styles.home}>
        <div className={styles.post}>
          <div className={styles.homeFeed}>
            <h1>home feed</h1>
          </div>
          <ul className={styles.postContainer}>
            {data?.data?.post?.map((cards) => {
              return (
                <li key={cards._id} className={styles.item}>
                  <Card cardProps={...cards} />
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.creator}>
          <div className={styles.heading}>
            <h1>top creators</h1>
          </div>
          <div className={styles.creators}>
            <ul className={styles.creatorsul}>
              {data?.data.users.map((user) => {
                return (
                  <li key={user._id} className={styles.creatorsli}>
                    <Follow user={user} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
