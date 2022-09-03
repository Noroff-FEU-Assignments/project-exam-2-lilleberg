import React from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import Searchbar from "../../components/ui/Searchbar/Searchbar";
import { NavLink } from "react-router-dom";

//import { BASE_URL } from "../../constants/api";

//const heroImage = BASE_URL + "?populate=*";
function Home() {
  return (
    <>
      <div className="hero">
        {/*image from strapi*/}
        <div className="hero__text">
          <Heading content="Welcome to Bergen" />
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
            bookings? Become a daze member now!
          </p>
        </section>
      </Container>
    </>
  );
}

export default Home;
