import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { getUser } from "../hooks/findUser";
import { IAddUser } from "../interfaces/userInterfaces";
type Props = {};

const Sidebar = (props: Props) => {
  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [foundUser, setFoundUser] = useState<IAddUser>({});

  const handleSearch = async () => {
    setError("");
    setFoundUser({});

    const res = await getUser(query);
    if (typeof res === "string") {
      setError(res);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else {
      setFoundUser(res);
    }
  };
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Container>
        <Col>
          <Row xs={1}>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <FormControl
                value={query}
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search Username..."
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </Row>
          <Row>
            {error ? (
              <Card className="mt-4">
                <Card.Body>No user Found</Card.Body>
              </Card>
            ) : !Object.keys(foundUser).length ? (
              <></>
            ) : (
              <Card className="mt-4">
                <Card.Body>{foundUser.username}</Card.Body>
              </Card>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Sidebar;
