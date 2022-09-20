import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "../../layout/Container/Container";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constants/api";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().trim().required("Enter the establishment's name"),
  price: yup
    .number("Enter digits only")
    .required("Enter the price")
    .typeError("Enter the price, digits only"),
  description: yup.string().trim().required("Enter a description"),
  roomsAvailable: yup
    .number("Enter digits only")
    .required("Enter rooms available")
    .typeError("Enter rooms available, digits only"),
  type: yup.string().required("Select the establishment's type"),
  dateFrom: yup.date().required("Select a date").typeError("Select a date"),
  dateTo: yup.date().required("Select a date").typeError("Select a date"),
  rating: yup
    .number("Enter digits only")
    .required("Enter a rating")
    .typeError("Enter a rating, digits only"),
  featuredImage: yup
    .mixed()
    .required("Add a featured image")
    .test("Add a featured image", (file) => {
      if (file) return true;
      return false;
    }),
  images: yup
    .mixed()
    .required("Add image(s)")
    .test("Add image(s)", (file) => {
      if (file) return true;
      return false;
    }),
});

function NewEstablishmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    setSubmitted(true);
    reset();
  }

  return (
    <Container className="container-main">
      <Form
        className="form new-establishment-form d-flex flex-column mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="" controlId="formBasicEmail">
          <Form.Label>Establishment's name</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NewEstablishmentForm;
