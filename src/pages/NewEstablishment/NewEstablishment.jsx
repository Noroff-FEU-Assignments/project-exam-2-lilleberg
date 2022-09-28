import React from "react";
import NewEstablishmentForm from "../../components/forms/NewEstablishmentForm/NewEstablishmentForm";
import PageTitle from "../../components/other/PageTitle/PageTitle";
import Heading from "../../components/typography/Heading/Heading";

function NewEstablishment() {
  return (
    <>
      <PageTitle
        title="Add establishment"
        content="Admin | Create a new establishment for Holidaze"
      />
      <Heading content="Add establishment" />
      <NewEstablishmentForm />
    </>
  );
}

export default NewEstablishment;
