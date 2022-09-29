import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import Container from "../../components/layout/Container/Container";
import EstablishmentSpecificItem from "../../components/establishmentItems/EstablishmentSpecificItem/EstablishmentSpecificItem";
import ResponseMessage from "../../components/ui/ResponseMessage/ResponseMessage";
import Heading from "../../components/typography/Heading/Heading";
import PageTitle from "../../components/other/PageTitle/PageTitle";

function EstablishmentSpecific() {
  const [establishment, setEstablishment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  const { id } = useParams();
  if (!id) navigate("/");

  const url = `${BASE_URL}establishments/${id}?populate=*`;

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);

        if (response.status === 200)
          setEstablishment(response.data.data.attributes);
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
      <ResponseMessage className="response-message response-message--error mx-auto">
        {error}
      </ResponseMessage>
    );

  const {
    name,
    images,
    description,
    price,
    dateTo,
    dateFrom,
    rating,
    roomsAvailable,
    type,
  } = establishment;

  let length = 150;
  const trimmedDesc =
    description.length >= length
      ? description.substring(0, length - 3) + "..."
      : description;

  return (
    <>
      <PageTitle title={name} description={trimmedDesc} />
      <Container className="container-main">
        <Heading content={name} />
        <EstablishmentSpecificItem
          images={images.data}
          description={description}
          price={price}
          dateFrom={dateFrom}
          dateTo={dateTo}
          rating={rating}
          roomsAvailable={roomsAvailable}
          type={type}
        />
      </Container>
    </>
  );
}

export default EstablishmentSpecific;
