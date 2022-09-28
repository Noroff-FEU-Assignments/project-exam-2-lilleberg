import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import Container from "../../components/layout/Container/Container";
import PageTitle from "../../components/other/PageTitle/PageTitle";
import Heading from "../../components/typography/Heading/Heading";

function Login() {
  return (
    <>
      <PageTitle
        title="Sign in"
        description="Admin | Sign in to Holidaze to view messages and add new establishments."
      />
      <Container className="container-main">
        <Heading content="Sign in" />
        <LoginForm />
      </Container>
    </>
  );
}

export default Login;
