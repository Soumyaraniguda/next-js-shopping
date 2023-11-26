"use client";

import { useState } from "react";
import styles from "../../../styles/auth.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "@/components/inputs/loginInInput/page";
import CurvedButtonWithIcon from "@/components/buttons/CurvedButtonWithIcon/page";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/DotLoader";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot-password", {
        email,
      });
      setError("");
      setSuccess(data.message);
      setLoading(false);
      setEmail("");
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading && <DotLoaderSpinner loading={loading} />}
      <div className={styles.forgot}>
        <div>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password? <Link href="/">Login instead</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Forgot password</h1>

            <Formik
              enableReinitialize
              initialValues={{
                email,
              }}
              validationSchema={emailValidation}
              onSubmit={() => handleForgotPassword()}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <CurvedButtonWithIcon type="submit" text="Send email" />
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
      <Footer />
    </>
  );
}

export default ForgotPassword;
