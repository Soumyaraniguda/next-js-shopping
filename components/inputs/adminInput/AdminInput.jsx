import React from "react";

import { ErrorMessage, useField } from "formik";
import styles from "./styles.module.scss";

function AdminInput({
  placeholder,
  label,
  showLabel,
  stylesToOverride,
  ...props
}) {
  const [field, meta] = useField(props);

  return (
    <>
      {showLabel && (
        <label
          className={`${styles.adminInputLabel} ${
            meta.touched && meta.error ? styles.error : ""
          }`}
        >
          <span>{label}</span>
        </label>
      )}

      <div
        className={`${styles.adminInput} 
        ${meta.error ? styles.error : ""} 
        `}
        style={stylesToOverride}
      >
        <input
          type={field.type}
          name={field.name}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {meta.error ? (
          <div className={styles.error__message}>
            <ErrorMessage name={field.name} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default AdminInput;
