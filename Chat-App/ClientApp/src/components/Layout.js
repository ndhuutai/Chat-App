import React from 'react';
import { Container, ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import NavMenu from './NavMenu';
import { Rail, List } from 'semantic-ui-react'


export default props => (
  <div>
    <NavMenu />
    <Container>
      {props.children}
    </Container>
  </div>
);
