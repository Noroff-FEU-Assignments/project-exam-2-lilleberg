import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "../../layout/Container/Container";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AuthContext from "../../../context/AuthContext";
import { useContext } from "react";
import { BASE_URL } from "../../../constants/api";
import ResponseMessage from "../../ui/ResponseMessage/ResponseMessage";
import { Spinner } from "react-bootstrap";
import scrollToTop from "../../../js/scrollToTop";

const estabTypes = ["BnB", "Hotel", "Guesthouse"];

const options = estabTypes.map((type, key) => {
  return (
    <option key={key} value={type}>
      {type}
    </option>
  );
});

const schema = yup.object().shape({
  name: yup.string().trim().required("Enter the establishment's name"),
  type: yup
    .string()
    .required("Select the establishment's type")
    .oneOf(estabTypes),
  price: yup
    .number()
    .required("Enter the price")
    .typeError("Enter the price, digits only"),
  description: yup.string().trim().required("Enter a description"),
  roomsAvailable: yup
    .number()
    .min(1, "Must be minimum 1 room")
    .typeError("Enter rooms, digits only"),
  rating: yup
    .number()
    .required("Enter a rating")
    .min(0, "Must be minimum 0")
    .max(5, "Max rating of 5")
    .typeError("Enter a rating, digits only"),
  featuredImage: yup.mixed().required("Add a featured image"),
  images: yup.mixed().required("Add images"),
});

function NewEstablishmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const url = BASE_URL + "establishments?populate=*";
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    if (!auth) navigate("/");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setLoading(true);
    scrollToTop(window);

    const estabData = {
      name: data.name,
      price: data.price,
      type: data.type,
      roomsAvailable: data.roomsAvailable,
      description: data.description,
      rating: data.rating,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(estabData));
    formData.append("files.featuredImage", data.featuredImage[0]);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("files.images", data.images[i]);
    }

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.status === 200) {
        setSubmitted(true);
        reset();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="container-main">
      <Form
        className="form new-establishment-form d-flex flex-column mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {submitted && (
          <ResponseMessage className="response-message response-message--success mx-auto">
            A new establishment has been created
          </ResponseMessage>
        )}

        {loading && (
          <ResponseMessage className="response-message response-message--informative mx-auto">
            <Spinner className="spinner spinner--small" animation="grow" />
            Creating new establishment...
          </ResponseMessage>
        )}

        {error && (
          <ResponseMessage className="response-message response-message--error mx-auto">
            {error}
          </ResponseMessage>
        )}

        <Form.Group className="form__group" controlId="name">
          <Form.Label className="form__label">
            Establishment's name <span className="form__required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            className="form__input"
            {...register("name")}
          />
          {errors.name && (
            <ResponseMessage className="input-error">
              {errors.name.message}
            </ResponseMessage>
          )}
        </Form.Group>

        <Form.Group className="form__group" controlId="type">
          <Form.Label className="form__label">
            Type <span className="form__required">*</span>
          </Form.Label>

          <Form.Select
            className="form__input"
            {...register("type")}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {options}
          </Form.Select>
          {type
            ? null
            : errors.type && (
                <ResponseMessage className="input-error">
                  {errors.type.message}
                </ResponseMessage>
              )}
        </Form.Group>

        <Form.Group
          className="form__group form__group--price"
          controlId="price"
        >
          <Form.Label className="form__label">
            Price <span className="form__required">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            min="0"
            className="form__input"
            {...register("price")}
          />
          {errors.price && (
            <ResponseMessage className="input-error">
              {errors.price.message}
            </ResponseMessage>
          )}
        </Form.Group>

        <Form.Group className="form__group" controlId="description">
          <Form.Label className="form__label">
            Description <span className="form__required">*</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="form__input"
            {...register("description")}
          />
          {errors.description && (
            <ResponseMessage className="input-error">
              {errors.description.message}
            </ResponseMessage>
          )}
        </Form.Group>

        <div className="d-flex justify-content-between w-100">
          <Form.Group
            className="form__group form__group--rating"
            controlId="rating"
          >
            <Form.Label className="form__label">
              Rating <span className="form__required">*</span>
            </Form.Label>

            <Form.Control
              type="number"
              step="any"
              className="form__input"
              {...register("rating")}
            />
            {errors.rating && (
              <ResponseMessage className="input-error">
                {errors.rating.message}
              </ResponseMessage>
            )}
          </Form.Group>

          {type !== "Guesthouse" ? (
            <Form.Group
              className="form__group form__group--rooms"
              controlId="roomsAvailable"
            >
              <Form.Label className="form__label">
                Rooms available <span className="form__required">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                className="form__input"
                {...register("roomsAvailable")}
              />
              {errors.roomsAvailable && (
                <ResponseMessage className="input-error">
                  {errors.roomsAvailable.message}
                </ResponseMessage>
              )}
            </Form.Group>
          ) : (
            <Form.Group
              className="form__group form__group--rooms"
              controlId="roomsAvailable"
            >
              <Form.Label className="form__label">
                Number of bedrooms <span className="form__required">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                className="form__input"
                {...register("roomsAvailable")}
              />
              {errors.roomsAvailable && (
                <ResponseMessage className="input-error">
                  {errors.roomsAvailable.message}
                </ResponseMessage>
              )}
            </Form.Group>
          )}
        </div>

        <Form.Group controlId="featuredImage" className="form__group">
          <Form.Label className="form__label">
            Featured image <span className="form__required">*</span>
          </Form.Label>

          <Form.Control
            type="file"
            className="form__input"
            {...register("featuredImage")}
            required
            accept=".jpeg,.jpg,.png"
          />
          {errors.featuredImage && (
            <ResponseMessage className="input-error">
              {errors.featuredImage.message}
            </ResponseMessage>
          )}
        </Form.Group>

        <Form.Group controlId="images" className="form__group">
          <Form.Label className="form__label">Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            required
            accept=".jpeg,.jpg,.png"
            className="form__input"
            {...register("images")}
          />
          <p className="form__input--images-added"></p>
          {errors.images && (
            <ResponseMessage className="input-error">
              {errors.images.message}
            </ResponseMessage>
          )}
        </Form.Group>

        <Button className="btn btn--submit align-self-center" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NewEstablishmentForm;
