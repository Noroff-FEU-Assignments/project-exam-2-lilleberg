import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("Please enter your first name")
    .min(2, "Must be at least 2 characters"),
  lastName: yup
    .string()
    .trim()
    .required("Please enter your last name")
    .min(2, "Must be at least 2 characters"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  subject: yup.string().trim().required("Please enter a subject"),
  message: yup
    .string()
    .trim()
    .required("Please enter a message")
    .min(10, "Must be at least 10 characters"),
});

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "messages";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log("data", data);

    const options = {
      data: data,
    };

    try {
      const response = await axios.post(url, options);
      console.log(response);

      if (response.status === 200) alert("Form submitted");
      if (response.error) alert("An error occurred");
    } catch (error) {
      console.log(error.response);
      setError(error.toString());
    } finally {
      setLoading(false);
    }

    setSubmitted(true);
    reset();
  }

  //NOT FINISHED YET

  return (
    <Form
      className="form d-flex flex-column mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form__fullName d-flex">
        <Form.Group
          className="form__group form__group--firstName"
          controlId="firstName"
        >
          <Form.Label className="form__label">First name *</Form.Label>
          <Form.Control
            className="form__input"
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && (
            <FormError className="input-error">
              {errors.firstName.message}
            </FormError>
          )}
        </Form.Group>

        <Form.Group className="form__group" controlId="lastName">
          <Form.Label className="form__label">Last name *</Form.Label>
          <Form.Control
            className="form__input"
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <FormError className="input-error">
              {errors.lastName.message}
            </FormError>
          )}
        </Form.Group>
      </div>

      <Form.Group className="form__group" controlId="emailAddress">
        <Form.Label className="form__label">Email address *</Form.Label>
        <Form.Control
          className="form__input"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <FormError className="input-error">{errors.email.message}</FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="subject">
        <Form.Label className="form__label">Subject *</Form.Label>
        <Form.Control
          className="form__input"
          type="text"
          {...register("subject")}
        />
        {errors.subject && (
          <FormError className="input-error">
            {errors.subject.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="message">
        <Form.Label className="form__label">Message *</Form.Label>
        <Form.Control
          className="form__input"
          as="textarea"
          rows={5}
          {...register("message")}
        />
        {errors.message && (
          <FormError className="input-error">
            {errors.message.message}
          </FormError>
        )}
      </Form.Group>
      <Button className="btn btn--submit align-self-center" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default ContactForm;
