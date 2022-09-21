import { useState, useEffect } from "react";
import Container from "../../components/layout/Container/Container";
import Heading from "../../components/typography/Heading/Heading";
import useAxios from "../../hooks/useAxios";
import Spinner from "react-bootstrap/Spinner";
import MessageItem from "../../components/messages/MessageItem/MessageItem";
import moment from "moment/moment";
import ResponseMessage from "../../components/ui/ResponseMessage/ResponseMessage";

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //authenticated request
  const http = useAxios();
  const apiEndpoint = "messages";

  useEffect(() => {
    (async function () {
      try {
        const response = await http.get(apiEndpoint);

        if (response.status === 200) setMessages(response.data.data);
      } catch (error) {
        console.log(error);
        setError("Uh oh, an error occurred. Please try to refresh.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return <Spinner className="spinner d-flex mx-auto" animation="grow" />;
  if (error) return <ResponseMessage>{error}</ResponseMessage>;

  return (
    <Container className="container-main">
      <Heading content="Messages" />
      <div className="message-container">
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
