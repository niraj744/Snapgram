import React, { useState } from "react";
import styles from "./Explore.module.scss";
import SaveCard from "../../Components/SaveCard/SaveCard";
import axios from "axios";
import { URL } from "../../../libs/FormMaterial";
import { useMutation } from "react-query";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";

export default function Explore() {
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  const getSearchPost = (data) => {
    return axios.post(`${URL}/deshboard/search`, data, {
      withCredentials: true,
    });
  };

  const onSuccess = (data) => {
    const isPost =
      data?.data?.posts.length == 0
        ? `Did't find any thing about ${search}`
        : null;
    setValue(isPost);
  };

  const { mutate, data, isLoading } = useMutation(getSearchPost, {
    onSuccess,
  });

  if (isLoading) {
    return <Loader state={isLoading} />;
  }

  const searchPost = () => {
    search.length > 0 && mutate({ search });
  };

  return (
    <>
      <div className={styles.exploreContainer}>
        <div className={styles.heading}>
          <h1>Search Posts</h1>
        </div>
        <div className={styles.search}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <span>
                <ion-icon name="search-outline"></ion-icon>
              </span>
              <input
                placeholder="Search something"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </li>
          </ul>
          <Button buttonFunction={searchPost} type={"button"}>
            search
          </Button>
        </div>
        <div className={styles.post}>
          <ul className={styles.ul}>
            {data?.data?.posts?.length > 0 ? (
              data.data.posts.map((posts) => {
                return (
                  <li key={posts._id} className={styles.li}>
                    <SaveCard post={posts} />
                  </li>
                );
              })
            ) : (
              <h1>{value}</h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
