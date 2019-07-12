import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {Link} from "react-router-dom";


export default (props) => {

    const onLinkClick = (e) => {
        e.preventDefault();
        props.onClick(e.target.text.trim());
    };

    return (
        <ListGroup>
            {props.users.length > 0 ? props.users.map((user, index) => (
                <ListGroupItem key={index}>
                    <Link to={
                        {
                            pathname: '/chat'
                        }}
                          onClick={onLinkClick}
                    >{user.userName} </Link>
                </ListGroupItem>
            )) : 'Loading'}
        </ListGroup>
    )
}
    
