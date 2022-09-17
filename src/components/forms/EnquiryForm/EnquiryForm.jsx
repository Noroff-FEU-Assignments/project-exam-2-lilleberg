import Form from "react-bootstrap/Form";
import FormError from "../../forms/FormError/FormError";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";
import Heading from "../../typography/Heading/Heading";
import Button from "react-bootstrap/Button";
import getDate from "../../../js/getDate";
import { useParams } from "react-router-dom";

function findEstablishment(id) {
  (async function () {
    const url = BASE_URL + "establishments";
    let estabName = "";
    console.log(id);

    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        const establishments = response.data.data;

        const elem = establishments.find((item) => item.id === id);

        estabName = elem.attributes.name;
        console.log(estabName);
      }
      return estabName;
    } catch (error) {
      console.log(error);
    }
  })();
}

console.log("FUNCTION CALL", findEstablishment(38));

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
    .typeError("Please enter your phone number, digits only"),
  email: yup
    .string()
    .required("Please enter your email")
    .email("Please enter a valid email"),
  dateFrom: yup
    .date()
    .required("Please pick a date")
    .typeError("Please pick a date"),
  dateTo: yup
    .date()
    .required("Please pick a date")
    .typeError("Please pick a date"),
  message: yup.string().trim(),
});

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  /* const estabName = findEstablishment(id);
  console.log("FORM LOG", estabName); */

  const url = BASE_URL + "enquiries";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const options = {
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        number: data.number,
        email: data.email,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        message: data.message,
        estabID: id,
      },
    };

    console.log("Options", options);

    try {
      const response = await axios.post(url, options);

      if (response.status === 200) alert("Form submitted");
      if (response.error) alert("An error occurred");
    } catch (error) {
      console.log(error.response);
      console.log(errors);
      setError(error.toString());
    } finally {
      setLoading(false);
    }

    setSubmitted(true);
    reset();
  }

  return (
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

      <Form.Group
        className="form__group form__group--number"
        controlId="number"
      >
        <Form.Label className="form__label">
          Phone number <span className="form__required">*</span>
        </Form.Label>
        <Form.Control
          className="form__input"
          type="tel"
          {...register("number")}
        />
        {errors.number && (
          <FormError className="input-error">{errors.number.message}</FormError>
        )}
      </Form.Group>

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

      <div>
        <Form.Label className="form__date-label my-0">
          Date <span className="form__required">*</span>
        </Form.Label>
        <div className="form__date d-flex">
          <Form.Group
            className="form__group form__group--dateFrom"
            controlId="dateFrom"
          >
            <Form.Label className="form__label">From</Form.Label>
            <Form.Control
              className="form__input"
              type="date"
              min={getDate()}
              {...register("dateFrom")}
            />
            {errors.dateFrom && (
              <FormError className="input-error">
                {errors.dateFrom.message}
              </FormError>
            )}
          </Form.Group>

          <Form.Group className="form__group" controlId="dateTo">
            <Form.Label className="form__label">To</Form.Label>
            <Form.Control
              className="form__input"
              type="date"
              min={getDate(1)}
              {...register("dateTo")}
            />
            {errors.dateTo && (
              <FormError className="input-error">
                {errors.dateTo.message}
              </FormError>
            )}
          </Form.Group>
        </div>
      </div>

      <Form.Group className="form__group" controlId="message">
        <Form.Label className="form__label">Message</Form.Label>
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

export default EnquiryForm;
