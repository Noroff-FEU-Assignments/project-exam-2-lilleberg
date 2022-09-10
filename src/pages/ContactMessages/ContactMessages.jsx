import { useState, useEffect } from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import useAxios from "../../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";
import FormError from "../../components/forms/FormError/FormError";
import MessageItem from "../../messages/MessageItem/MessageItem";
import moment from "moment/moment";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();
  const apiEndpoint = "messages";

  useEffect(() => {
    (async function () {
      try {
        const response = await http.get(apiEndpoint);
        console.log("Response", response.data.data);

        if (response.status === 200) setMessages(response.data.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Spinner animation="grow" />;
  if (error) return <FormError>Uh oh, an error occurred: {error}</FormError>;

  return (
    <Container className="container-main">
      <Heading content="Messages" />
      <div className="messages">
        {messages.map((message) => {
          const item = message.attributes;
          return (
            <MessageItem
              key={message.id}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              subject={item.subject}
              message={item.message}
              dateTime={moment(item.publishedAt).format("DD.MM.YYYY, H:mm")}
            />
          );
        })}
      </div>
    </Container>
  );
}

export default ContactMessages;

/* <div key={message.id} className="message">
              <div className="message_date-time">
                <p>{moment(item.publishedAt).format("DD.MM.YYYY, H:mm")}</p>
              </div>
              <div className="message__firstname d-flex">
                <p>First name</p>
                <p>{item.firstName}</p>
              </div>

              <div className="message__email d-flex">
                <p>Last name</p>
                <p>{item.lastName}</p>
              </div>

              <div className="email d-flex">
                <p>Email</p>
                <p>{item.email}</p>
              </div>

              <div className="message__subject d-flex">
                <p>Subject</p>
                <p>{item.subject}</p>
              </div>

              <div className="message__message d-flex">
                <p>Message</p>
                <p>{item.message}</p>
              </div>
            </div> */
