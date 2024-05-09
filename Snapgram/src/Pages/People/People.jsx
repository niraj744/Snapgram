import React from "react";
import Follow from "../../Components/Follow/Follow";
import Loader from "../../Components/Loader/Loader";
import styles from "./People.module.scss";
import { useQuery } from "react-query";
import { URL } from "../../../libs/FormMaterial";
import axios from "axios";

export default function People() {
  const User = () => {
    return axios.get(`${URL}/deshboard/get-users`, {
      withCredentials: true,
    });
  };
  const { data, isLoading } = useQuery(["getUser"], User);

  if (isLoading) {
    return <Loader state={isLoading} />;
  }

  return (
    <>
      <div className={styles.people}>
        <div className={styles.creator}>
          <div className={styles.heading}>
            <h1>all users</h1>
          </div>
          <div className={styles.creators}>
            <ul className={styles.creatorsul}>
              {data?.data?.users?.map((users) => {
                return (
                  <li key={users._id} className={styles.creatorsli}>
                    <Follow user={users} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
