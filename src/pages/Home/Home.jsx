import { useState, useEffect } from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import Searchbar from "../../components/ui/Searchbar/Searchbar";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ResponseMessage from "../../components/ui/ResponseMessage/ResponseMessage";

function Home() {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + "hero?populate=*";

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);

        if (response.status === 200)
          setImage(response.data.data.attributes.hero.data.attributes);
      } catch (error) {
        console.log(error);
        setError("Uh oh, an error occurred. Please try to refresh!");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <Spinner className="spinner d-flex mx-auto" animation="grow" />;
  if (error) return <ResponseMessage>{error}</ResponseMessage>;

  return (
    <>
      <div className="hero">
        <img
          src={image.url}
          alt={image.alternativeText}
          className="hero__img"
        />
        <div className="hero__text">
          <Heading content="Welcome to Bergen" className="h1-home" />
        </div>
      </div>
      <Container className="home">
        <Searchbar />

        <section className="home__stay d-flex flex-column align-items-center">
          <Heading size="2" content="Where to stay?" />
          <p>
            Holidaze has a great assortment of hotels, B&amp;B's and
            guesthouses. What do you prefer?
          </p>
          <NavLink to="/establishments" className="btn">
            Book now
          </NavLink>
        </section>

        <section className="home__member d-flex flex-column align-items-center">
          <Heading size="3" content="Member?" />
          <p className="text-center">
            Did you know members can collect bonus points to get discounts on
            bookings? Become a Daze member now!
          </p>
        </section>
      </Container>
    </>
  );
}

export default Home;
