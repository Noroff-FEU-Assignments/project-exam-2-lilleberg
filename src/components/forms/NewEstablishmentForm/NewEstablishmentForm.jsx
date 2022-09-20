import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "../../layout/Container/Container";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../FormError/FormError";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";

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
    .number("Enter digits only")
    .required("Enter the price")
    .typeError("Enter the price, digits only"),
  description: yup.string().trim().required("Enter a description"),
  roomsAvailable: yup
    .number("Enter digits only")
    .typeError("Enter rooms available, digits only"),
  rating: yup
    .number("Enter digits only")
    .required("Enter a rating")
    .min(0, "Must be minimum 0")
    .max(5, "Max rating of 5")
    .typeError("Enter a rating, digits only"),
  featuredImage: yup
    .mixed()
    .required("Add a featured image")
    .test("Add a featured image", (file) => {
      if (file) return true;
      return false;
    }),
});

/*   
  

featuredImage: yup
    .mixed()
    .required("Add a featured image")
    .test("Add a featured image", (file) => {
      if (file) return true;
      return false;
    })
    .typeError("Add a featured image"),
  images: yup
    .mixed()
    .required("Add images")
    .test("Add images", (file) => {
      if (file) return true;
      return false;
    })
    .typeError("Add images"), */

function NewEstablishmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  const apiEndpoint = "establishments";

  async function onSubmit(data) {
    console.log(data);

    let rooms = data.roomsAvailable;
    if (!rooms) rooms = 0;

    const estabData = {
      name: data.name,
      price: data.price,
      type: data.type,
      roomsAvailable: rooms,
      description: data.description,
      rating: data.rating,
    };

    console.log(estabData);

    const image = data.featuredImage[0];
    console.log(image, image.name);

    /* const formData = new FormData();
    formData.append("files.image", image, image.name);
    formData.append("data", JSON.stringify(estabData)); */

    const options = {
      data: estabData,
    };

    //for (const value of formData.values()) console.log(value);

    /* try {
      const response = await http.post(apiEndpoint, options);
      console.log(response);

      if (response.status === 200) alert("Form submitted");
    } catch (error) {
      console.log(error);
    }
 */
    /* Pass formType instead of type as form data */

    setSubmitted(true);
    //reset();
  }

  return (
    <Container className="container-main">
      <Form
        className="form new-establishment-form d-flex flex-column mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
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
            <FormError className="input-error">{errors.name.message}</FormError>
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
            <option value="" disabled>
              Select type
            </option>
            {options}
          </Form.Select>
          {type
            ? null
            : errors.type && (
                <FormError className="input-error">
                  {errors.type.message}
                </FormError>
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
            <FormError className="input-error">
              {errors.price.message}
            </FormError>
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
            <FormError className="input-error">
              {errors.description.message}
            </FormError>
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
              <FormError className="input-error">
                {errors.roomsAvailable.message}
              </FormError>
            )}
          </Form.Group>
        ) : null}

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
            <FormError className="input-error">
              {errors.rating.message}
            </FormError>
          )}
        </Form.Group>

        <Form.Group controlId="featuredImage" className="form__group">
          <Form.Label className="form__label">
            Featured image <span className="form__required">*</span>
          </Form.Label>

          <Form.Control
            type="file"
            className="form__input"
            required
            {...register("featuredImage")}
          />
          {errors.featuredImage && (
            <FormError className="input-error">
              {errors.featuredImage.message}
            </FormError>
          )}
        </Form.Group>

        {/*  <Form.Group controlId="images" className="form__group">
          <Form.Label className="form__label">Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            required
            className="form__input"
            {...register("images")}
          />
          {errors.images && (
            <FormError className="input-error">
              {errors.images.message}
            </FormError>
          )}
        </Form.Group> */}

        <Button className="btn btn--submit align-self-center" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NewEstablishmentForm;
