import Button from "react-bootstrap/Button";
import Heading from "../../typography/Heading/Heading";
import ImageCarousel from "../../ui/ImageCarousel/ImageCarousel";
import renderEstablishmentType from "../../../js/renderEstablishmentType";
import { useState } from "react";
import EnquiryModal from "../../ui/EnquiryModal/EnquiryModal";

function EstablishmentSpecificItem({
  name,
  images,
  description,
  price,
  rating,
  roomsAvailable,
  type,
}) {
  /* ADD PROPTYPES */

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
          {renderEstablishmentType(type, "estab__type semi-bold")}

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

export default EstablishmentSpecificItem;
