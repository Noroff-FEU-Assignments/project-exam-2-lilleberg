import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Heading from "../../typography/Heading/Heading";
import moment from "moment/moment";

function BnbItem({
  name,
  images,
  description,
  price,
  dateTo,
  dateFrom,
  rating,
  roomsAvailable,
  type,
}) {
  /* ADD PROPTYPES */
  function renderType(establishmentType) {
    switch (establishmentType) {
      case "bedAndBreakfast":
        return <p className="estab__type semi-bold">Bed and Breakfast</p>;
      case "hotel":
        return <p className="estab__type semi-bold">Hotel</p>;
      case "guesthouse":
        return <p className="estab__type semi-bold">Guesthouse</p>;
      default:
        return null;
    }
  }

  return (
    <div style={{ width: "20rem" }} className="mx-auto bnb">
      <Heading content={name} />
      <Carousel>
        {images.map((image) => {
          return (
            <Carousel.Item key={image.id}>
              <img
                style={{ height: "20rem" }}
                className="d-block w-100"
                src={image.attributes.url}
                alt={image.attributes.alternativeText}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="d-flex justify-content-between">
        <p>
          <span className="semi-bold">{price} NOK </span>night
        </p>
        <div className="d-flex align-items-baseline">
          <i className="bi bi-star-fill" aria-label="Rating"></i>
          <p>{rating}</p>
        </div>
      </div>

      {dateFrom && dateTo ? (
        <p className="guesthouse__available">
          Available: {moment({ dateFrom }).format("DD.MM.YYYY")} -{" "}
          {moment({ dateTo }).format("DD.MM.YYYY")}
        </p>
      ) : null}

      <Heading size="3" content="Description" />
      {renderType(type)}

      {roomsAvailable ? (
        <p>
          <span className="semi-bold">Rooms available:</span> {roomsAvailable}
        </p>
      ) : null}

      <p className="bnb__description">{description}</p>
      <div className="d-flex justify-content-end">
        <Button className="btn" to="#">
          Make a request
        </Button>
      </div>
    </div>
  );
}

export default BnbItem;
