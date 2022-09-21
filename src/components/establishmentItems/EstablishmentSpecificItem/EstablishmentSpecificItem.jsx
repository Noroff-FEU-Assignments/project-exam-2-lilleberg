import Button from "react-bootstrap/Button";
import Heading from "../../typography/Heading/Heading";
import ImageCarousel from "../../ui/ImageCarousel/ImageCarousel";
import { useState } from "react";
import EnquiryModal from "../../ui/EnquiryModal/EnquiryModal";
import PropTypes from "prop-types";

function EstablishmentSpecificItem({
  name,
  images,
  description,
  price,
  rating,
  roomsAvailable,
  type,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="mx-auto estab">
        <Heading content={name} />
        <ImageCarousel images={images} />

        <div className="d-flex justify-content-between estab__price-rating">
          <p>
            <span className="semi-bold">{price} NOK </span>night
          </p>
          <div className="d-flex align-items-baseline estab__rating">
            <i className="bi bi-star-fill" aria-label="Rating"></i>
            <p>{rating}</p>
          </div>
        </div>

        <Heading size="2" content="Description" />
        <div className="estab__type-rooms">
          <p className="estab__type semi-bold">{type}</p>

          {roomsAvailable ? (
            <p>
              <span className="semi-bold">Rooms available:</span>{" "}
              {roomsAvailable}
            </p>
          ) : null}
        </div>

        <p className="bnb__description">{description}</p>
        <div className="d-flex justify-content-end">
          <Button className="btn estab__btn" onClick={handleShow}>
            Make a request
          </Button>
        </div>
      </div>

      <EnquiryModal show={show} handleClose={handleClose} />
    </>
  );
}

EstablishmentSpecificItem.propTypes = {
  name: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  roomsAvailable: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default EstablishmentSpecificItem;
