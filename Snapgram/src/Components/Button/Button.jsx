import React from "react";
import styles from "./Button.module.scss";

export default function Button({ children, size, type, buttonFunction }) {
  return (
    <>
      <div className={styles.button} style={{ width: size }}>
        <button onClick={buttonFunction} type={type}>
          {children}
        </button>
      </div>
    </>
  );
}
