import Button from "react-bootstrap/Button";
import Heading from "../../typography/Heading/Heading";
import moment from "moment/moment";
import ImageCarousel from "../../ui/ImageCarousel/ImageCarousel";
import renderEstablishmentType from "../../../js/renderEstablishmentType";

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

  return (
    <div className="mx-auto estab">
      <Heading content={name} />
      <ImageCarousel images={images} />

      <div className="d-flex justify-content-between estab__price-rating">
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

      <Heading size="2" content="Description" />
      <div className="estab__type-rooms">
        {renderEstablishmentType(type, "estab__type semi-bold")}

        {roomsAvailable ? (
          <p>
            <span className="semi-bold">Rooms available:</span> {roomsAvailable}
          </p>
        ) : null}
      </div>

      <p className="bnb__description">{description}</p>
      <div className="d-flex justify-content-end">
        <Button className="btn estab__btn" to="#">
          Make a request
        </Button>
      </div>
    </div>
  );
}

export default BnbItem;
