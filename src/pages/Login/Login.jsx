import React from "react";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";

function Login() {
  return (
    <Container className="container-main">
      <Heading content="Sign in" />
      <LoginForm />
    </Container>
  );
}

export default Login;
