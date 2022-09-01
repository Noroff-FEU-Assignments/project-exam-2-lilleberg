import React from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
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
      <Container></Container>
    </>
  );
}

export default Home;
