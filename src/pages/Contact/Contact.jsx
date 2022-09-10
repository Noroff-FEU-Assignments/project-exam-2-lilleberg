import ContactForm from "../../components/forms/ContactForm/ContactForm";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";

function Contact() {
  return (
    <Container className="container-main">
      <Heading content="Contact" />
      <ContactForm />
    </Container>
  );
}

export default Contact;
