import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import Navbar from '../../partials/Navbar';

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div>
        <Navbar />
        <Container fluid>
            <Row>
                <Col style={{backgroundColor : "purple"}} xs={3}>
                    jksjfkjsdkffjskfdj
                </Col>
                <Col style={{backgroundColor : "red"}}>
                    skljfksjfkljdskfkslf
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Dashboard