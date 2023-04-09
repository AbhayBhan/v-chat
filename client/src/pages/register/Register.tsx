import React, { FormEvent, useState } from "react";
import { Container, Form, Card, Row, Col, Button, Alert } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom";
import { IRegister } from "../../interfaces/userInterfaces";
import { checkUsername , submitUser } from "../../hooks/register";

type Props = {};

const Register = (props: Props) => {
  const [isUsernameSafe, setIsUsernameSafe] = useState<Boolean>(false);
  const [error, setError] = useState<String>("");
  const navigate = useNavigate();

  const [formBody, setFormBody] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUsernameAPI = async (data: string) => {
    const res = await checkUsername(data);
    setIsUsernameSafe(res);
  };

  const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formBody.password !== formBody.confirmPassword){
      setError("Passwords do not match!");
      setTimeout(() => {
        setError("");
      },5000);
    }else{
      const errorMessage : string = await submitUser(formBody);
      if(errorMessage !== "success"){
        setError(errorMessage);
        return;
      }
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
                <h3>Register!</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mt-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      value={formBody.username}
                      onChange={(e) => {
                        handleUsernameAPI(e.target.value);
                        setFormBody({ ...formBody, username: e.target.value });
                      }}
                      type="text"
                      required={true}
                      placeholder="Username..."
                    />
                    {!isUsernameSafe ? (
                      <h6
                        className="mt-1"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        Pick Different Username
                      </h6>
                    ) : (
                      <></>
                    )}
                  </Form.Group>
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
                  <Form.Group className="mt-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      value={formBody.confirmPassword}
                      onChange={(e) => {
                        setFormBody({...formBody, confirmPassword : e.target.value});
                      }}
                      type="password"
                      required={true}
                      placeholder="Re-enter your password..."
                    />
                  </Form.Group>
                  <Link to="/login">
                    <h6 className="mt-2" style={{ fontSize: "14px" }}>
                      Already have an account?
                    </h6>
                  </Link>
                  {
                    error && (
                      <Alert className="mt-1" variant="danger">{error}</Alert>
                    )
                  }
                  <Button
                    className="mt-2"
                    disabled={!isUsernameSafe}
                    type="submit"
                  >
                    Register
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

export default Register;
