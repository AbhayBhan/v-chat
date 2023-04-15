import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../../partials/Navbar";
import Sidebar from "../../partials/Sidebar";

type Props = {};

const Dashboard = (props: Props) => {
  {
    /* Active Chat state create here */
  }
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
          <Col>skljfksjfkljdskfkslf</Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
