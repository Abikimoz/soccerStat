import React from 'react';
import { Container, Nav, Navbar, Col, Image } from 'react-bootstrap';

export const Navbars = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Col md={1}>
          <Image src="logo.png"/>
        </Col>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#Leagues">Лиги</Nav.Link>
            <Nav.Link href="#link">Команды</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
