import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, TOKEN_PATH } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import FormError from "../FormError/FormError";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    console.log(data);

    const options = {
      identifier: data.username,
      password: data.password,
    };

    try {
      const response = await axios.post(url, options);
      console.log("Response:", response);

      if (response.status === 200) {
        setAuth(response.data);
        navigate("/admin/new-establishment");
      }
    } catch (error) {
      console.log(error);
      setLoginError("Username and/or password is incorrect");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      className="form d-flex flex-column mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {loginError && (
        <FormError className="form-error mx-auto">{loginError}</FormError>
      )}
      <Form.Group className="form__group" controlId="formBasicEmail">
        <Form.Label className="form__label">Email</Form.Label>
        <Form.Control
          className="form__input"
          type="text"
          name="username"
          {...register("username")}
        />
        {errors.username && (
          <FormError className="input-error">
            {errors.username.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="formBasicPassword">
        <Form.Label className="form__label">Password</Form.Label>
        <Form.Control
          className="form__input"
          type="password"
          name="password"
          {...register("password")}
        />
        {errors.password && (
          <FormError className="input-error">
            {errors.password.message}
          </FormError>
        )}
      </Form.Group>

      <Button className="btn btn--submit align-self-center" type="submit">
        {submitting ? "Logging in..." : "Sign in"}
      </Button>
    </Form>
  );
}

export default LoginForm;
