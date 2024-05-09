import React, { useState } from "react";
import Styles from "./Signup.module.scss";
import Button from "../../Components/Button/Button";
import {
  initialValuesSignup,
  validationSchemaSignup,
  URL,
} from "../../../libs/FormMaterial";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

export default function Signup() {
  const navigation = useNavigate();
  const [avatar, setAvatar] = useState("");

  const signup = (data) => {
    return axios.post(`${URL}/auth/Sign-up`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onSuccess = (data) => {
    if (data.data.success) {
      navigation("/");
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

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess,
    onError,
  });

  if (isLoading) {
    return <Loader state={true} />;
  }

  const onSubmit = (values, actions) => {
    values.avatar = avatar;
    mutate(values);
  };

  return (
    <>
      <section className={Styles.signup}>
        <div className={Styles.signupContainer}>
          <div className={Styles.logo}>
            <img src="/logo.svg" alt="Logo" />
          </div>
          <div className={Styles.title}>
            <h1>Create a new account</h1>
            <p>To use tapgram, Please enter your details</p>
          </div>
          <div className={Styles.form}>
            <Formik
              initialValues={initialValuesSignup}
              validationSchema={validationSchemaSignup}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmit}
            >
              <Form>
                <div className={Styles.username}>
                  <label htmlFor="username">Username</label>
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    id="username"
                  />
                  <ErrorMessage
                    name="username"
                    className="error"
                    component={"p"}
                  />
                </div>
                <div className={Styles.username}>
                  <label htmlFor="lastname">Lastname</label>
                  <Field
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    id="lastname"
                  />
                  <ErrorMessage
                    name="lastname"
                    className="error"
                    component={"p"}
                  />
                </div>
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
                <div className={Styles.username}>
                  <label htmlFor="avatar">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    id="avatar"
                    file={avatar}
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>

                <Button size="100%" type="submit">
                  Sign up
                </Button>
                <p>
                  Already have an account? <Link to={"/"}>login</Link>
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
