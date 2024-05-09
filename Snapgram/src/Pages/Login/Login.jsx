import React from "react";
import Styles from "./Login.module.scss";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {
  initialValuesLogin,
  validationSchemaLogin,
  URL,
} from "../../../libs/FormMaterial";
import { useMutation } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

export default function Login() {
  const navigation = useNavigate();

  const login = (data) => {
    return axios.post(`${URL}/auth/log-in`, data, {
      withCredentials: true,
    });
  };

  const onSuccess = (data) => {
    if (data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success("Successfully logged-in !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigation("/Deshboard");
    } else {
      toast.error(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onError = (error) => {
    toast.error(error.response.data.message || error.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const { mutate, isLoading } = useMutation(login, {
    onSuccess,
    onError,
  });

  if (isLoading) {
    return <Loader state={true} />;
  }

  const onSubmit = (values, action) => {
    mutate(values);
  };

  return (
    <>
      <section className={Styles.login}>
        <div className={Styles.loginContainer}>
          <div className={Styles.logo}>
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className={Styles.title}>
            <h1>Log in to your account</h1>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <div className={Styles.form}>
            <Formik
              initialValues={initialValuesLogin}
              validationSchema={validationSchemaLogin}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmit}
            >
              <Form>
                <div className={Styles.username}>
                  <label htmlFor="email">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    id="email"
                  />
                  <ErrorMessage
                    name="email"
                    className="error"
                    component={"p"}
                  />
                </div>
                <div className={Styles.username}>
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    className="error"
                    component={"p"}
                  />
                </div>
                <Button size="100%" type={"submit"}>
                  Login
                </Button>
                <p>
                  Don't have an account? <Link to={"/Sign-up"}>sign up</Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
        <div className={Styles.sidebg}></div>
      </section>
    </>
  );
}
