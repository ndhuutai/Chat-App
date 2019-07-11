import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";

export default (props) => (
    <ListGroup>
        {props.users.length > 0? props.users.map(user => (
            <ListGroupItem>{user.userName}</ListGroupItem>
        )): 'Loading'}
    </ListGroup>
)