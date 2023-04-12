import React, { FormEvent, useState } from "react";
import { Container, Form, Card, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ILogin } from "../../interfaces/userInterfaces";
import { handleLoginRequest } from "../../hooks/login";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const [error, setError] = useState<String>("");
  const [formBody, setFormBody] = useState<ILogin>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorMessage = await handleLoginRequest(formBody);
    if(errorMessage !== "Success!"){
      setError(errorMessage);
      setTimeout(() => {
        setError("");
      },5000);
    }else{
      navigate('/dashboard');
    }
  }

  return (
    <div
      style={{
        padding: 20,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Container className="mt-3">
        <Row>
          <Col>
            <Card className="shadow-lg">
              <Card.Header className="mt-2 text-center">
                <h3>Login!</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={formBody.email}
                      onChange={(e) => {
                        setFormBody({ ...formBody, email: e.target.value });
                      }}
                      type="email"
                      required={true}
                      placeholder="Email..."
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      value={formBody.password}
                      onChange={(e) => {
                        setFormBody({ ...formBody, password: e.target.value });
                      }}
                      type="password"
                      required={true}
                      placeholder="Password..."
                    />
                  </Form.Group>
                  <Link to="/register">
                    <h6
                      className="mt-2"
                      style={{ color: "blue", fontSize: "14px" }}
                    >
                      Don't have an account?
                    </h6>
                  </Link>
                  {
                    error && (
                      <Alert className="mt-1" variant="danger">{error}</Alert>
                    )
                  }
                  <Button className="mt-2" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
