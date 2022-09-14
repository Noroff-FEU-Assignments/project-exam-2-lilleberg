import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Heading from "../../typography/Heading/Heading";
import moment from "moment/moment";

function BnbItem({
  name,
  images,
  description,
  price,
  dateFrom,
  dateTo,
  rating,
  roomsAvailable,
}) {
  return (
    <Card style={{ width: "20rem" }} className="mx-auto bnb">
      <Heading content={name} />
      <Carousel>
        {images.map((image) => {
          return (
            <Carousel.Item>
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
      <Card.Body>
        <div className="d-flex justify-content-between">
          <p>
            <span className="semi-bold">{price} NOK </span>night
          </p>
          <div className="d-flex align-items-baseline">
            <i className="bi bi-star-fill" aria-label="Rating"></i>
            <p>{rating}</p>
          </div>
        </div>
        <p>
          Available: {moment(dateFrom).format("DD.M.YYYY")} -{" "}
          {moment(dateTo).format("DD.M.YYYY")}
        </p>
        <p>{description}</p>
        <div className="d-flex justify-content-end">
          <Link className="btn" to="#">
            Make a request
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BnbItem;
