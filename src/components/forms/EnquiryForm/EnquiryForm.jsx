import Form from "react-bootstrap/Form";
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
    .required("Please select a date")
    .typeError("Please select a date"),
  dateTo: yup
    .date()
    .required("Please select a date")
    .typeError("Please select a date"),
  message: yup.string().trim(),
});

function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState({});

  const { id } = useParams();
  const url = BASE_URL + "enquiries";

  //Get establishment's name for form
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(BASE_URL + "establishments/" + id);

        if (response.status === 200) {
          setName(response.data.data.attributes.name);
        } else {
          setName("Unknown");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        number: data.number,
        email: data.email,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        message: data.message,
        estabID: id,
        establishment: name,
      },
    };

    try {
      const response = await axios.post(url, options);

      if (response.status === 200) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      setError("There was an error. Please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      className="form enquiry-form d-flex flex-column mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading content={`${name} - Booking Enquiry`} />

      {submitted && (
        <ResponseMessage className="response-message response-message--success">
          Thank you - your enquiry has been submitted.
        </ResponseMessage>
      )}

      {loading && (
        <ResponseMessage className="response-message response-message--informative mx-auto">
          <Spinner className="spinner spinner--small" animation="grow" />
          Sending enquiry...
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
            <ResponseMessage className="input-error">
              {errors.firstName.message}
            </ResponseMessage>
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
            <ResponseMessage className="input-error">
              {errors.lastName.message}
            </ResponseMessage>
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
          <ResponseMessage className="input-error">
            {errors.number.message}
          </ResponseMessage>
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
          <ResponseMessage className="input-error">
            {errors.email.message}
          </ResponseMessage>
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
              <ResponseMessage className="input-error">
                {errors.dateFrom.message}
              </ResponseMessage>
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
              <ResponseMessage className="input-error">
                {errors.dateTo.message}
              </ResponseMessage>
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
          <ResponseMessage className="input-error">
            {errors.message.message}
          </ResponseMessage>
        )}
      </Form.Group>

      <Button className="btn btn--submit align-self-center" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default EnquiryForm;
