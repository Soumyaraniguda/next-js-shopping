"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/auth.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/inputs/loginInInput/page";
import CurvedButtonWithIcon from "@/components/buttons/CurvedButtonWithIcon/page";
import { getOAuthSignInMethods } from "@/utils/OAuthSignIn";
import { signIn } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import DotLoaderSpinner from "@/components/loaders/DotLoader";
import { useRouter } from "next/navigation";
import InputWithCsrf from "@/components/InputWithCsrf";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/page";

const initialValues = {
  loginEmail: "",
  loginPassword: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  success: "",
  error: "",
  loginError: "",
};

function SignIn({ params, searchParams }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);

  // console.log({ router, params, searchParams });

  const {
    loginEmail,
    loginPassword,
    name,
    email,
    password,
    confirmPassword,
    success,
    error,
    loginError,
  } = user;

  const [authProviders, setAuthProviders] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    loginEmail: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    loginPassword: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed"),

    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),

    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password should be minimum of 8 characters"),

    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: response.data.message });
      setLoading(false);
      setTimeout(async () => {
        // Login after registering
        let options = {
          redirect: false, // Do not redirect by default
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        router.push("/");
      }, 100);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    let options = {
      redirect: false, // Do not redirect by default
      email: loginEmail,
      password: loginPassword,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setUser({ ...user, loginError: res?.error });
    } else {
      router.push(searchParams?.callbackUrl || "/");
    }
  };

  useEffect(() => {
    getOAuthSignInMethods().then((res) => {
      const filteredProviders = res?.filter(
        (provider) => provider.id !== "credentials"
      );
      setAuthProviders(filteredProviders);
    });
  }, []);

  return (
    <>
      <Header />
      {loading && <DotLoaderSpinner loading={loading} />}

      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>

          <div className={styles.login__form}>
            <h1>Login</h1>
            <p>
              Get access to one of the best #shopping services in the world.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                loginEmail,
                loginPassword,
              }}
              validationSchema={loginValidation}
              onSubmit={() => handleLogin()}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signup/email">
                  <InputWithCsrf value={user.loginEmail} />
                  <LoginInput
                    type="text"
                    name="loginEmail"
                    icon="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="loginPassword"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CurvedButtonWithIcon type="submit" text="Login" />
                  {loginError && (
                    <span className={styles.error}>{loginError}</span>
                  )}
                  <div className={styles.forgot__password}>
                    <Link href="/auth/forgot-password">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>

            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {(authProviders || [])?.map((provider) => {
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <Image
                          src={`/icons/${provider.name}.png`}
                          width={30}
                          height={30}
                          alt={provider.name}
                        />
                        Login with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* --------------- Register form ---------------- */}
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Register</h1>
            <p>
              Get access to one of the best #shopping services in the world.
            </p>

            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                confirmPassword,
              }}
              validationSchema={registerValidation}
              onSubmit={() => {
                handleRegister();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email address"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />

                  <LoginInput
                    type="password"
                    name="confirmPassword"
                    icon="password"
                    placeholder="Confirm password"
                    onChange={handleChange}
                  />

                  <CurvedButtonWithIcon type="submit" text="Register" />
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

export default SignIn;
