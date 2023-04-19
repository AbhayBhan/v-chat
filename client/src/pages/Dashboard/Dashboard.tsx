import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatComponent from "../../partials/ChatComponent";
import Navbar from "../../partials/Navbar";
import Sidebar from "../../partials/Sidebar";
import { getMessages } from "../../hooks/messages";
import { IFriendData } from "../../interfaces/userInterfaces";
import { IMessage } from "../../interfaces/messageInterfaces";

type Props = {};

const Dashboard = (props: Props) => {
  const uidString: string | null = localStorage.getItem("uid");
  const uid: any = uidString !== null ? JSON.parse(uidString) : null;

  const [loading, setLoading] = useState<boolean>(false);
  const [chatState, setChatState] = useState<IFriendData | null>(null);

  const [messages, setMessages] = useState<Array<IMessage>>([]);

  useEffect(() => {
    const changeChat = async () => {
      if (chatState) {
        setLoading(true);
        const res = await getMessages(uid, chatState.id);
        if (typeof res === "string") {
          setChatState(null);
          setLoading(false);
        } else {
          setMessages(res);
          console.log(res);
          setLoading(false);
        }
      }
    };

    changeChat();
  }, [chatState]);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col
            className="shadow"
            style={{
              backgroundColor: "white",
              height: "100vh",
            }}
            xs={3}
          >
            <Sidebar setChatState={setChatState} />
          </Col>
          <Col>
            {!chatState ? (
              <>Open Some Chat Bro</>
            ) : loading ? (
              <>Loading...</>
            ) : (
              <ChatComponent chatState={chatState} messages={messages} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
