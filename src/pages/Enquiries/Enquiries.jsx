import { useState, useEffect } from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import useAxios from "../../hooks/useAxios";
import { Spinner } from "react-bootstrap";
import FormError from "../../components/forms/FormError/FormError";
import moment from "moment/moment";
import EnquiryItem from "../../components/messages/EnquiryItem/EnquiryItem";

function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //authenticated request
  const http = useAxios();
  const apiEndpoint = "enquiries";

  useEffect(() => {
    (async function () {
      try {
        const response = await http.get(apiEndpoint);

        if (response.status === 200) setEnquiries(response.data.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  console.log(enquiries);

  if (loading)
    return <Spinner className="spinner d-flex mx-auto" animation="grow" />;
  if (error) return <FormError>Uh oh, an error occurred: {error}</FormError>;

  return (
    <Container className="container-main">
      <Heading content="Enquiries" />
      <div className="enquiries-container">
        {enquiries.map((enquiry) => {
          const item = enquiry.attributes;
          console.log(item);
          return (
            <EnquiryItem
              key={item.id}
              establishment={item.establishment}
              firstName={item.firstName}
              lastName={item.lastName}
              number={item.number}
              email={item.email}
              dateFrom={moment(item.dateFrom).format("DD.MM.YYYY")}
              dateTo={moment(item.dateTo).format("DD.MM.YYYY")}
              message={item.message}
              dateTime={moment(item.publishedAt).format("DD.MM.YYYY, H:mm")}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default Enquiries;
