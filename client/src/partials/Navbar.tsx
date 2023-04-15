import React from 'react';
import {Container , Navbar as Nav} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {}

const Navbar = (props: Props) => {
    const navigate = useNavigate();
  return (
    <div>
        <Nav bg='dark' expand='sm' variant='dark'>
            <Container>
                <Nav.Brand>V-Chat</Nav.Brand>
                <div style={{
                    display : 'flex',
                    flexDirection : 'row-reverse',
                    cursor : 'pointer'
                }} 
                onClick={() => {
                    localStorage.clear();
                    navigate('/login')
                }}
                >
                    <FaUser color='white' size={25} />
                </div>
            </Container>
        </Nav>
    </div>
  )
}

export default Navbar