import React, { useState, useRef } from "react";
import styles from "./UpdatePost.module.scss";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import {
  initialValuesCreate,
  validationSchemaCreate,
} from "../../../libs/FormMaterial";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function UpdatePost() {
  const input = useRef();
  const [isImage, setIsImage] = useState(
    <>
      <span>
        <ion-icon name="images-outline"></ion-icon>
      </span>
      <p>upload photos here</p>
      <span>PNG,JPEG</span>
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

  const onSubmit = (values, action) => {
    console.log({ values, file });
  };

  return (
    <>
      <div className={styles.UpdatePost}>
        <div className={styles.heading}>
          <h1>
            <ion-icon name="images"></ion-icon>
          </h1>
          <h1>Update post</h1>
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
                  hidden
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
                <Button type="submit">Sign up</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
