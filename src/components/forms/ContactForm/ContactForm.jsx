import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import ResponseMessage from "../../ui/ResponseMessage/ResponseMessage";
import Spinner from "react-bootstrap/Spinner";

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
  subject: yup
    .string()
    .trim()
    .min(5, "Minimum 5 characters")
    .max(20, "Maximum 20 characters")
    .required("Please enter a subject"),
  message: yup
    .string()
    .trim()
    .required("Please enter a message")
    .min(10, "Must be at least 10 characters"),
});

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const options = {
      data: data,
    };

    try {
      const response = await axios.post(url, options);

      if (response.status === 200) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      setError("I'm sorry, there was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      className="form d-flex flex-column mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {submitted && (
        <ResponseMessage className="response-message response-message--success">
          Thank you - your form has been submitted.
        </ResponseMessage>
      )}

      {loading && (
        <ResponseMessage className="response-message response-message--informative mx-auto">
          <Spinner className="spinner spinner--small" animation="grow" />
          Sending form...
        </ResponseMessage>
      )}

      {error && (
        <ResponseMessage className="response-message response-message--error">
          {error}
        </ResponseMessage>
      )}

      <div className="form__fullName d-flex">
        <Form.Group
          className="form__group form__group--firstName"
          controlId="firstName"
        >
          <Form.Label className="form__label">
            First name <span className="form__required">*</span>
          </Form.Label>
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
          <Form.Label className="form__label">
            Last name <span className="form__required">*</span>
          </Form.Label>
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
        <Form.Label className="form__label">
          Email address <span className="form__required">*</span>
        </Form.Label>
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
        <Form.Label className="form__label">
          Subject <span className="form__required">*</span>
        </Form.Label>
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
        <Form.Label className="form__label">
          Message <span className="form__required">*</span>
        </Form.Label>
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
