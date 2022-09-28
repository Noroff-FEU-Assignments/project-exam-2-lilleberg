import Heading from "../../typography/Heading/Heading";
import ImageCarousel from "../../ui/ImageCarousel/ImageCarousel";
import { useState } from "react";
import EnquiryModal from "../../ui/EnquiryModal/EnquiryModal";
import PropTypes from "prop-types";

function EstablishmentSpecificItem({
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

          {type !== "Guesthouse" ? (
            <p>
              <span className="semi-bold">Rooms available:</span>{" "}
              {roomsAvailable}
            </p>
          ) : (
            <p>
              <span className="semi-bold">Number of bedrooms:</span>{" "}
              {roomsAvailable}
            </p>
          )}
        </div>

        <p className="bnb__description">{description}</p>
        <div className="d-flex justify-content-end">
          <button className="btn estab__btn" onClick={handleShow}>
            Make a request
          </button>
        </div>
      </div>

      <EnquiryModal show={show} handleClose={handleClose} />
    </>
  );
}

EstablishmentSpecificItem.propTypes = {
  images: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  roomsAvailable: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default EstablishmentSpecificItem;
