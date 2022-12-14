import Container from "../../components/layout/Container/Container";
import PageTitle from "../../components/other/PageTitle/PageTitle";
import Heading from "../../components/typography/Heading/Heading";
import frog from "../../images/frog.png";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
      <PageTitle
        title="404 - page not found"
        description={`This page doesn't seem to exist, but you could always go to the ${(
          <Link to="https://holidaze-pe2-mh.netlify.app/">Homepage</Link>
        )}!`}
      />
      <Container className="container-main not-found d-flex flex-column align-items-center">
        <Heading content="404 - Page not found" />
        <p className="not-found">
          I am very, very sorry, but this is clearly not the page you must have
          been looking for.
        </p>
        <p className="not-found">
          Why don't you go back and try again. And if that doesn't work - third
          time's a charm!
        </p>
        <img src={frog} alt="Illustration of confused frog" />
      </Container>
    </>
  );
}

export default PageNotFound;
