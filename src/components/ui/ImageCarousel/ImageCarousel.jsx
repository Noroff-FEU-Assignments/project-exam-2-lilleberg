import Carousel from "react-bootstrap/Carousel";
import PropTypes from "prop-types";

function ImageCarousel({ images }) {
  return (
    <Carousel fade>
      {images.map((image) => {
        return (
          <Carousel.Item key={image.id}>
            <img
              className="d-block w-100 estab__img"
              src={image.attributes.url}
              alt={image.attributes.alternativeText}
            />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

ImageCarousel.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageCarousel;
