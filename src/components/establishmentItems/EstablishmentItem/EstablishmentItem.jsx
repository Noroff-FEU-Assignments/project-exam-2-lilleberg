import Card from "react-bootstrap/Card";
import Heading from "../../typography/Heading/Heading";
import PropTypes from "prop-types";
import renderEstablishmentType from "../../../js/renderEstablishmentType";

function EstablishmentItem({
  image,
  altText,
  name,
  rating,
  price,
  description,
  type,
}) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={image}
        alt={altText}
        className="establishment__img"
      />
      <Card.Body>
        <div className="establishment__name-rating d-flex justify-content-between">
          <div className="card-title">
            <Heading size="2" content={name} />
          </div>
          <div className="establishment__rating d-flex align-items-baseline">
            <i className="bi bi-star-fill" aria-label="Rating"></i>
            <p>{rating}</p>
          </div>
        </div>
        <Card.Text>
          {renderEstablishmentType(type, "estab__type semi-bold")}
        </Card.Text>
        <Card.Text className="establishment__price">
          <span className="semi-bold">{price} NOK</span> night
        </Card.Text>

        <Card.Text className="establishment__description">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EstablishmentItem.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default EstablishmentItem;
