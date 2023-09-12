import React from "react";
import styles from "./styles.module.scss";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

function LoginInput({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      {icon == "user" ? (
        <BiUser />
      ) : icon == "email" ? (
        <AiOutlineMail />
      ) : icon == "password" ? (
        <IoKeyOutline />
      ) : (
        ""
      )}
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error__message}>
          <ErrorMessage name={field.name} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default LoginInput;
