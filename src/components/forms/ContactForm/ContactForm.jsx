import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";

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
    formstate: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {}

  return <div></div>;
}

export default ContactForm;
