import React,{useState} from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChatComponent from "../../partials/ChatComponent";
import Navbar from "../../partials/Navbar";
import Sidebar from "../../partials/Sidebar";

type Props = {};

const Dashboard = (props: Props) => {
  const [chatState, setChatState] = useState(null);
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row>
          <Col
            className="shadow"
            style={{
              backgroundColor: "white",
              height: "100vh"
            }}
            xs={3}
          >
            <Sidebar />
          </Col>
          <Col>
            {chatState ? <ChatComponent /> : <>Open Some Chat Bro</>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
