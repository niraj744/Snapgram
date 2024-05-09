import React from "react";
import styles from "./Loader.module.scss";

export default function Loader({ state }) {
  const displayValue = state ? "flex" : "none";
  return (
    <>
      <div className={styles.loader} style={{ display: displayValue }}>
        <h1>loading...</h1>
      </div>
    </>
  );
}
