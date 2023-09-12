import React from "react";
import styles from "./loaders.module.scss";
import { DotLoader } from "react-spinners";

function DotLoaderSpinner({ loading }) {
  return (
    <div className={styles.loader}>
      <DotLoader color="#2f82ff" loading={loading} />
    </div>
  );
}

export default DotLoaderSpinner;
