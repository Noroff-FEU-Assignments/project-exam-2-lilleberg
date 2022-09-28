import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import Heading from "../../components/typography/Heading/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container/Container";
import EstablishmentItem from "../../components/establishmentItems/EstablishmentItem/EstablishmentItem";
import ResponseMessage from "../../components/ui/ResponseMessage/ResponseMessage";
import PageTitle from "../../components/other/PageTitle/PageTitle";

function Establishments() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "establishments?populate=*";

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);

        if (response.status === 200) setEstablishments(response.data.data);
      } catch (error) {
        setError("Uh oh, an error occurred! Please try to refresh.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <Spinner className="spinner d-flex mx-auto" animation="grow" />;
  if (error)
    return (
      <ResponseMessage className="response-message response-message--error mt-5">
        {error}
      </ResponseMessage>
    );

  return (
    <>
      <PageTitle
        title="Establishments"
        description="View all our great establishments and book the right one for you. And enjoy Bergen!"
      />
      <Container className="container">
        <Heading content="Establishments" />
        <Row className="establishments-container justify-content-center">
          {establishments.map((establishment) => {
            const item = establishment.attributes;
            const image = item.featuredImage.data.attributes;
            return (
              <Col
                key={establishment.id}
                md={6}
                xl={4}
                className="establishment"
              >
                <Link to={`/establishment/${establishment.id}`}>
                  <EstablishmentItem
                    image={item.featuredImage.data.attributes.url}
                    altText={image.attributes ? image.attributes : image.name}
                    name={item.name}
                    rating={item.rating}
                    price={item.price}
                    description={item.description}
                    type={item.type}
                  />
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Establishments;
