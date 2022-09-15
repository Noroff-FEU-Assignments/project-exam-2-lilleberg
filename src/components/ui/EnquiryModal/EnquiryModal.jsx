import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormError from "../../forms/FormError/FormError";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import Heading from "../../typography/Heading/Heading";

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
  number: yup
    .number("Please enter digits only")
    .required("Please enter your number")
    .min(5, "Must be at least 5 digits")
    .max(13, "Can't be longer than 13 digits"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  subject: yup.string().trim().required("Please enter a subject"),
  dateFrom: yup.date().required("Please pick a date"),
  dateTo: yup.date().required("Please pick a date"),
  message: yup.string().trim(),
});

function EnquiryModal({ show, handleClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "enquiries";

  let date = new Date();
  let dateToday = `${("0" + date.getDate()).slice(-2)}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${date.getFullYear()}`;
  console.log(dateToday);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log("data:", data);

    try {
      const response = await axios.post(url);
      console.log("Response", response);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Form
        className="form enquiry-form d-flex flex-column mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading content="Booking Enquiry Form" />

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

        <Form.Group className="form__group" controlId="number">
          <Form.Label className="form__label">Phone number *</Form.Label>
          <Form.Control
            className="form__input"
            type="tel"
            {...register("number")}
          />
          {errors.number && (
            <FormError className="input-error">
              {errors.number.message}
            </FormError>
          )}
        </Form.Group>

        <div className="form__date">
          <Form.Label className="m-0">Date *</Form.Label>
          <Form.Group className="form__group" controlId="dateFrom">
            <Form.Label className="form__label">From</Form.Label>
            <Form.Control
              className="form__input"
              type="date"
              {...register("dateFrom")}
            />
            {errors.dateFrom && (
              <FormError className="input-error">
                {errors.dateFrom.message}
              </FormError>
            )}
          </Form.Group>

          <Form.Group className="form__group" controlId="dateFrom">
            <Form.Label className="form__label">To</Form.Label>
            <Form.Control
              className="form__input"
              type="date"
              {...register("dateTo")}
            />
            {errors.dateTo && (
              <FormError className="input-error">
                {errors.dateTo.message}
              </FormError>
            )}
          </Form.Group>
        </div>

        <Form.Group className="form__group" controlId="message">
          <Form.Label className="form__label">Optional message</Form.Label>
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
    </Modal>
  );
}

export default EnquiryModal;
