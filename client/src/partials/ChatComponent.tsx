import React from "react";
import { IFriendData } from "../interfaces/userInterfaces";
import { IMessage } from "../interfaces/messageInterfaces";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";

type Props = {
  chatState: IFriendData | null;
  messages: Array<IMessage>;
};

const ChatComponent = ({ chatState, messages }: Props) => {
  return (
    <div style={{ padding: 10 }}>
      <Container fluid>
        <Col>
          <Row style={{ height: "80vh" }}>
            <Card>
              <Card.Header>{chatState?.username}</Card.Header>
              <Card.Body>
                {messages.map((msg) => {
                  return (
                    <div key={msg.text} style={{display : "flex", flexDirection : "row-reverse"}}>
                      <h6 style={{color : "white", padding : 10, backgroundColor : "blue", borderRadius : "20px"}}>{msg.text}</h6>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Row>
          <Row className="mt-4">
            <Form style={{ display: "flex", gap: 20 }}>
              <Form.Control type="text" placeholder="Type your Message..." />
              <Button type="submit">Send</Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default ChatComponent;
