import React from "react";
import NewEstablishmentForm from "../../components/forms/NewEstablishmentForm/NewEstablishmentForm";
import Heading from "../../components/typography/Heading/Heading";

function NewEstablishment() {
  return (
    <>
      <Heading content="Create new establishment" />
      <NewEstablishmentForm />
    </>
  );
}

export default NewEstablishment;
