import React from 'react';
import {Link} from "react-router-dom";


export default (props) => {

    const onLinkClick = (e) => {
        e.preventDefault();
        props.onClick(e.target.text.trim());
    };

    return (
        <ul>
            {props.users.length > 0 ? props.users.map((user, index) => (
                <li key={index} className="list-group-item d-none d-sm-none d-md-block">
                    <Link to={
                        {
                            pathname: '/chat'
                        }}
                          onClick={onLinkClick}
                    >{user.userName}</Link>
                </li>
            )) : 'Loading'}
        </ul>
    )
}
    
