import React, { useEffect, useState } from "react";
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

import { IAddUser, IFriendData } from "../interfaces/userInterfaces";
import { addFriend } from "../hooks/friends";
type Props = {
  setChatState: React.Dispatch<React.SetStateAction<IFriendData|null>>;
};

const Sidebar = ({setChatState}: Props) => {
  const uidString: string | null = localStorage.getItem("uid");
  const uid: any = uidString !== null ? JSON.parse(uidString) : null;

  const [query, setQuery] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [foundUser, setFoundUser] = useState<IAddUser>({});

  const friendArray: string | null = localStorage.getItem("friends");
  const friends: any = friendArray !== null ? JSON.parse(friendArray) : null;

  const [friendList, setFriendList] = useState<Array<IFriendData>>(friends);

  useEffect(() => {
    localStorage.setItem('friends',JSON.stringify(friendList));
  },[friendList])

  const handleAddFriend = async (friendID : string|number|undefined) => {
    const res : string = await addFriend(uid,friendID);
    if(res === "Success"){
      const temp = {
        id : friendID,
        username : foundUser.username,
        email : foundUser.email
      }
      setFriendList([...friendList,temp]);
    }
  }

  const handleSearch = async () => {
    setError("");
    setFoundUser({});

    const res : IAddUser|string = await getUser(query);
    if (typeof res === "string") {
      setError(res);
      setTimeout(() => {
        setError("");
      }, 5000);
    } else if(res.id === uid){
      setError("Aw that lonely?");
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
                    {foundUser.friends?.some(id => id === uid) ? (
                      <Button variant="danger" disabled={true}>
                        Can't Add
                      </Button>
                    ) : (
                      <Button onClick={() => {
                        handleAddFriend(foundUser.id);
                      }} variant="success">+ Add</Button>
                    )}
                  </Stack>
                </Card.Body>
              </Card>
            )}
          </Row>
          <Row>
            <div className="mt-4" style={{borderTop : "solid black 2px"}}>
            </div>
          </Row>
          <Row>
            {friendList.length !== 0 ? (
              friendList.map((frnd: IFriendData) => {
                return (
                  <Card className="mt-4" key={frnd.username} onClick={() => {
                    setChatState(frnd);
                  }}>
                    <Card.Body>
                      {frnd.username}
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <></>
            )}
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Sidebar;
