import React from "react";
import { Container, Form, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {};

const Register = (props: Props) => {
  return (
    <div
      style={{
        padding: 20,
        maxWidth: "800px",
        margin : "0 auto"
      }}
    >
      <Container className="mt-3">
        <Row>
          <Col>
            <Card className="shadow-lg">
              <Card.Header className="mt-2 text-center">
                <h3>Register!</h3>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mt-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username..." />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email..." />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password..." />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Re-enter your password..."
                    />
                  </Form.Group>
                  <Link to='/login'><h6 className="mt-2" style={{fontSize : "14px"}}>Already have an account?</h6></Link>
                  <Button className="mt-2" type="submit">Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
