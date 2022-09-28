import ContactForm from "../../components/forms/ContactForm/ContactForm";
import Container from "../../components/layout/Container/Container";
import PageTitle from "../../components/other/PageTitle/PageTitle";
import Heading from "../../components/typography/Heading/Heading";

function Contact() {
  return (
    <>
      <PageTitle
        title="Contact"
        description="Got any questions about Holidaze? Send us a message and we will help you out."
      />
      <Container className="container-main">
        <Heading content="Contact" />
        <ContactForm />
      </Container>
    </>
  );
}

export default Contact;
