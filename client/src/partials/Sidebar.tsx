import React from 'react';
import { Container , Row, Col, FormControl } from 'react-bootstrap';
type Props = {}

const Sidebar = (props: Props) => {
    return (
        <div style={{
            padding : 20
        }}>
            <Container>
                <Col>
                    <Row xs={1}>
                        <FormControl type='text' placeholder='Search User...' />
                    </Row>
                    <Row>
                        {/* Render the friends here */}
                    </Row>
                </Col>
            </Container>
        </div>
    );
}

export default Sidebar