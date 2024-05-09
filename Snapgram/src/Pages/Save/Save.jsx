import React from "react";
import styles from "./Save.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import { URL } from "../../../libs/FormMaterial";
import Loader from "../../Components/Loader/Loader";
import SaveCard from "../../Components/SaveCard/SaveCard";

export default function Save() {
  const getSavedPost = () => {
    return axios.get(`${URL}/deshboard/getSavesPost`, {
      withCredentials: true,
    });
  };

  const { data, isLoading } = useQuery(["savePost"], getSavedPost);

  if (isLoading) {
    return <Loader state={isLoading} />;
  }

  return (
    <>
      <div className={styles.save}>
        <div className={styles.heading}>
          <h1>
            <ion-icon name="bookmark-outline"></ion-icon>
          </h1>
          <h1>Saved Posts</h1>
        </div>
        <div className={styles.post}>
          <ul className={styles.ul}>
            {data?.data?.SavedPost?.savePosts.map((post) => {
              return (
                <li key={post._id} className={styles.li}>
                  <SaveCard post={post} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
