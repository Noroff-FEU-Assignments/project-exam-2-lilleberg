import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("Please enter your name")
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
    .min(10, "Must be at least 1+ characters"),
});

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);

    setSubmitted(true);
    reset();
  }

  return (
    <Form
      className="form d-flex flex-column mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group className="form__group" controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          className="form__input"
          type="text"
          placeholder="First name"
          {...register("firstName")}
        />
        {errors.firstName && (
          <FormError className="input-error">
            {errors.firstName.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="lastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          className="form__input"
          type="text"
          placeholder="Last name"
          {...register("lastName")}
        />
        {errors.lastName && (
          <FormError className="input-error">
            {errors.lastName.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="emailAddress">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          className="form__input"
          type="email"
          placeholder="ola@hello.com"
          {...register("email")}
        />
        {errors.email && (
          <FormError className="input-error">{errors.email.message}</FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          className="form__input"
          type="text"
          placeholder="name@example.com"
          {...register("subject")}
        />
        {errors.subject && (
          <FormError className="input-error">
            {errors.subject.message}
          </FormError>
        )}
      </Form.Group>

      <Form.Group className="form__group" controlId="message">
        <Form.Label>Message</Form.Label>
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
