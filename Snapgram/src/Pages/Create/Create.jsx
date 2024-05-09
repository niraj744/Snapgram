import React, { useState, useRef } from "react";
import styles from "./Create.module.scss";
import Button from "../../Components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import {
  initialValuesCreate,
  validationSchemaCreate,
  URL as url,
} from "../../../libs/FormMaterial";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Create() {
  const input = useRef();

  const [isImage, setIsImage] = useState(
    <>
      <span>
        <ion-icon name="images-outline"></ion-icon>
      </span>
      <p>upload photos here</p>
      <span>PNG,JPG,JPEG</span>
      <button type="button">upload from computer</button>
    </>
  );

  const [file, setFile] = useState("");

  const change = (e) => {
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setIsImage(
      <>
        <img src={url} alt="image preview" />
      </>
    );
  };

  const navigation = useNavigate();

  const post = (data) => {
    return axios.post(`${url}/deshboard/post`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const onSuccess = (data) => {
    if (data.data.success) {
      navigation("/");
      toast.success("Post created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error(data.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const onError = (error) => {
    toast.error(error.response.data.message || error.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const { mutate, isLoading } = useMutation(post, {
    onSuccess,
    onError,
  });

  if (isLoading) {
    return <Loader state={true} />;
  }

  const tagsConvert = (tags) => {
    const verified = tags.split(",");
    let array = [];
    array = verified.map((tags) => {
      return `#${tags}`;
    });
    return array.join(" ");
  };

  const onSubmit = (values, action) => {
    const { caption, location, tags } = values;
    const image = file;
    const verified = tagsConvert(tags);
    const obj = { caption, image, location, verified };
    mutate(obj);
  };

  return (
    <>
      <div className={styles.saveContainer}>
        <div className={styles.heading}>
          <h1>
            <ion-icon name="images"></ion-icon>
          </h1>
          <h1>create post</h1>
        </div>
        <div className={styles.form}>
          <Formik
            initialValues={initialValuesCreate}
            validationSchema={validationSchemaCreate}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={onSubmit}
          >
            <Form className={styles.form}>
              <div className={styles.formField}>
                <label htmlFor="caption">Caption</label>
                <Field
                  component="textarea"
                  name="caption"
                  cols="30"
                  rows="8"
                  id="caption"
                ></Field>
                <ErrorMessage
                  name="caption"
                  className="error"
                  component={"p"}
                />
              </div>
              <div className={styles.formField}>
                <input
                  type="file"
                  file={file}
                  onChange={change}
                  ref={input}
                  name="image"
                  hidden
                  accept="image/png , image/jpeg , image/jpg"
                  required
                />
                <label htmlFor="Photos">Add Photos</label>
                <div
                  className={styles.upload}
                  onClick={(e) => input.current.click()}
                >
                  {isImage}
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="location">Add Location</label>
                <Field type="text" name="location" id="location" />
                <ErrorMessage
                  name="location"
                  className="error"
                  component={"p"}
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="tags">
                  Add Tags (separated by comma " , ")
                </label>
                <Field
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="Art, Expression, Learn"
                />
                <ErrorMessage name="tags" className="error" component={"p"} />
              </div>
              <div className={styles.button}>
                <Link to={"/"} className={styles.cancel}>
                  <button>cancel</button>
                </Link>
                <Button type="submit">create</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
