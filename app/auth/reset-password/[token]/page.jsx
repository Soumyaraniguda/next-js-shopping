"use client";

import { useState } from "react";
import styles from "../../../../styles/auth.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "@/components/inputs/loginInInput/page";
import CurvedButtonWithIcon from "@/components/buttons/CurvedButtonWithIcon/page";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/DotLoader";

function ResetPassword({ params }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password")
      .min(8, "Password should be minimum of 8 characters")
      .max(36, "Password can't be more than 36 characters"),

    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleResetPassword = async () => {
    try {
      setLoading(true);

      setError("");
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.forgot}>
        <div>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password <Link href="/">Login instead</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Reset password</h1>

            <Formik
              enableReinitialize
              initialValues={{
                password,
                confirmPassword,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => handleResetPassword()}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="New password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <LoginInput
                    type="password"
                    name="confirmPassword"
                    icon="password"
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <CurvedButtonWithIcon type="submit" text="Reset" />
                </Form>
              )}
            </Formik>
            <div style={{ marginTop: "10px" }}>
              {success && <span className={styles.success}>{success}</span>}
              {error && <span className={styles.error}>{error}</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
