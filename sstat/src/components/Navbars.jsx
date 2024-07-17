import React from 'react';
import { Container, Nav, Navbar, Col, Image } from 'react-bootstrap';

function Navbars() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Col md={1}>
          <Image src="logo.png" rounded responsive />
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#LeagueInfo">Лиги</Nav.Link>
            <Nav.Link href="#link">Команды</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
