import React from 'react';
import { Col, Container, Row, Card, Form, Button } from 'react-bootstrap';

type Props = {}

const ChatComponent = (props: Props) => {
  return (
    <div style={{padding : 10}}>
      <Container fluid>
        <Col>
          <Row style={{height : '80vh'}}>
            <Card>
              <Card.Header>Chat 1</Card.Header>
              <Card.Body>
                hello
              </Card.Body>
            </Card>
          </Row>
          <Row className='mt-4'>
            <Form style={{display : 'flex', gap : 20}}>
              <Form.Control type='text' placeholder='Type your Message...' />
              <Button type='submit'>Send</Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </div>
  )
}

export default ChatComponent