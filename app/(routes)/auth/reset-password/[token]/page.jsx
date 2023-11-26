"use client";

import { useEffect, useState } from "react";
import styles from "../../../../styles/auth.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import LoginInput from "@/components/inputs/loginInInput/page";
import CurvedButtonWithIcon from "@/components/buttons/CurvedButtonWithIcon/page";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/DotLoader";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";

function ResetPassword({ params }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");

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
      const { data } = await axios.put("/api/auth/reset-password", {
        userId,
        password,
      });

      // Login after resetting password
      let options = {
        redirect: false, // Do not redirect by default
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);

      setError("");
      setLoading(false);

      // Reload the window as we logged in using credentials we will have session
      // and the useeffect will redirect user to home page
      window.location.reload(true);
    } catch (error) {
      setError(error.response.data.message);
      setSuccess("");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      // If user navigates to the reset password url after resetting and login we need to
      // Redirect the page to home
      router.push("/");
    } else if (params.token) {
      axios
        .get(`/api/validate-token/${params.token}`)
        .then((response) => {
          setUserId(response.id);
        })
        .catch((error) => {
          setUserId("");
        });
    }
  }, [params.token, session]);

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
      <Footer />
    </>
  );
}

export default ResetPassword;
