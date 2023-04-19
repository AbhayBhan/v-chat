import React,{FormEvent, useState} from "react";
import { IFriendData } from "../interfaces/userInterfaces";
import { IMessage } from "../interfaces/messageInterfaces";
import { Col, Container, Row, Card, Form, Button } from "react-bootstrap";
import { sendMessage } from "../hooks/messages";

type Props = {
  chatState: IFriendData | null;
  messages: Array<IMessage>;
  setMessages : React.Dispatch<React.SetStateAction<Array<IMessage>>>
};

const ChatComponent = ({ chatState, messages, setMessages }: Props) => {
  const uidString: string | null = localStorage.getItem("uid");
  const uid: any = uidString !== null ? JSON.parse(uidString) : null;

  const [message, setMessage] =  useState<string>("");

  const handleMessageSend = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await sendMessage(uid, chatState?.id, message);
    setMessage("")
    if(typeof(res) === "string"){
      console.log(res);
    }else{
      setMessages([...messages, res]);
    }
  }

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
            <Form onSubmit={handleMessageSend} style={{ display: "flex", gap: 20 }}>
              <Form.Control onChange={(e) => {
                setMessage(e.target.value);
              }} value={message} type="text" placeholder="Type your Message..." required={true} />
              <Button type="submit">Send</Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default ChatComponent;
