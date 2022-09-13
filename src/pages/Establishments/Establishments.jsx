import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import FormError from "../../components/forms/FormError/FormError";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import Heading from "../../components/typography/Heading/Heading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Container from "../../components/layout/Container/Container";
import EstablishmentCard from "../../components/establishmentItems/EstablishmentItem/EstablishmentItem";

function Establishments() {
  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "establishments?populate=*";

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        console.log(response.data.data);

        if (response.status === 200) setEstablishments(response.data.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <Spinner className="spinner d-flex mx-auto" animation="grow" />;
  if (error)
    return (
      <FormError>
        Uh oh, an error occurred: {error.response.statusText}. Please try to
        refresh!
      </FormError>
    );

  return (
    <Container className="container-main">
      <Heading content="Establishments" />
      <Row className="establishments-container mx-auto">
        {establishments.map((establishment) => {
          const item = establishment.attributes;
          return (
            <Col key={establishment.id} md={6} lg={4} xl={3}>
              <Link to={`/establishment/${establishment.id}`}>
                <EstablishmentCard
                  image={item.featuredImage.data.attributes.url}
                  altText={item.featuredImage.data.attributes.alternativeText}
                  name={item.name}
                  rating={item.rating}
                  price={item.price}
                  description={item.description}
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Establishments;
