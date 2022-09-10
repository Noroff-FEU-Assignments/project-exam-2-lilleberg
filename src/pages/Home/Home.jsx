import { useState, useEffect } from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import Searchbar from "../../components/ui/Searchbar/Searchbar";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import FormError from "../../components/forms/FormError/FormError";

function Home() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "hero?populate=*";

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        console.log(response);

        if (response.status === 200)
          setImage(response.data.data.attributes.hero.data.attributes);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spinner animation="grow" />;
  if (error)
    return (
      <FormError>Uh oh, an error occurred: {error}. Please refresh!</FormError>
    );
  //EDIT FORMERROR TO BE ERROR BECAUSE MORE USE THAN FORMS

  return (
    <>
      <div className="hero">
        <img src={image.url} alt={image.alternativeText} className="" />
        <div className="hero__text">
          <Heading content="Welcome to Bergen" className="h1-home" />
        </div>
      </div>
      <Container className="container-main">
        <Searchbar />

        <section className="d-flex flex-column align-items-center">
          <Heading size="2" content="Where to stay?" />
          <p>
            Holidaze has a great assortment of hotels, B&amp;B's and
            guesthouses. What do you prefer?
          </p>
          <NavLink to="/establishments" className="btn">
            Book now
          </NavLink>
        </section>

        <section className="d-flex flex-column align-items-center">
          <Heading size="3" content="Member?" />
          <p>
            Did you know members can collect bonus points to get discounts on
            bookings? Become a Daze member now!
          </p>
        </section>
      </Container>
    </>
  );
}

export default Home;
