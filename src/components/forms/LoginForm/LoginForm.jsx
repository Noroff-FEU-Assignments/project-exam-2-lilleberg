import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
/* import { BASE_URL, TOKENPATH } from "";
import AuthContext from ""; */
import FormError from "../FormError/FormError";

/*
  const url = BASE_URL + TOKEN_PATH;
  console.log(url);
*/

const schema = yup.object().shape({
  username: yup.string().required("Please enter email or usename"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("Response:", response.data);

      if (response.ok) {
        setAuth(response.data);
        navigate("/admin/new-establishment");
      }
    } catch (error) {
      console.log("Error: " + error);
      setLoginError("Password and/or username is incorrect");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loginError && <FormError className="form-error">{loginError}</FormError>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email/username</Form.Label>
        <Form.Control
          type="text"
          placeholder="ola@nordmann.no"
          name="username"
          {...register("username")}
        />
        {errors.username && (
          <FormError className="input-error">
            {errors.username.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          {...register("password")}
        />
        {errors.password && (
          <FormError className="input-error">
            {errors.password.message}
          </FormError>
        )}
      </Form.Group>

      <Button className="btn btn--submit" type="submit">
        {submitting ? "Logging in..." : "Sign in"}
      </Button>
    </Form>
  );
}

export default LoginForm;
