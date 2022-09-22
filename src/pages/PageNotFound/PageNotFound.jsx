import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";

function PageNotFound() {
  return (
    <Container>
      <Heading content="404 - page not found" />
      <p className="not-found">
        I am very, very sorry, but this is clearly not the page you must have
        been looking for.
      </p>
      <p className="not-found">
        Why don't you go back and try again. And if that works - third time's a
        charm!
      </p>
    </Container>
  );
}

export default PageNotFound;
