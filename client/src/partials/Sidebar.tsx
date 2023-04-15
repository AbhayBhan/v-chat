import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormControl,
  Button,
  Card,
  Stack,
} from "react-bootstrap";
import { getUser } from "../hooks/findUser";
import { IAddUser } from "../interfaces/userInterfaces";
type Props = {};

const Sidebar = (props: Props) => {
  const uidString: string | null = localStorage.getItem("uid");
  const uid: any = uidString !== null ? JSON.parse(uidString) : null;

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
                  setError("");
                  setFoundUser({});
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
                <Card.Body>
                  <Stack direction="horizontal" className="mx-auto" gap={5}>
                    <h5>{foundUser.username}</h5>
                    {foundUser.friends?.includes(uid) ? (
                      <Button variant="danger" disabled={true}>
                        Already Friends
                      </Button>
                    ) : (
                      <Button variant="success">+ Add</Button>
                    )}
                  </Stack>
                </Card.Body>
              </Card>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Sidebar;
