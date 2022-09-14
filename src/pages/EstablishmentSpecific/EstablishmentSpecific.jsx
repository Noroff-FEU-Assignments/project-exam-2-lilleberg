import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/api";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import FormError from "../../components/forms/FormError/FormError";
import Container from "../../components/layout/Container/Container";
import BnbItem from "../../components/establishmentItems/EstablishmentSpecificItem/EstablishmentSpecificItem";

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
        setError(error.toString());
        console.log("ERROR:", error);
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
        Uh oh, an error occurred: {error}. Please try to refresh!
      </FormError>
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

  return (
    <div>
      <Container className="container-main">
        <BnbItem
          name={name}
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
    </div>
  );
}

export default EstablishmentSpecific;
