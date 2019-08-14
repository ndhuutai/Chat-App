import React from 'react';
import {Link} from "react-router-dom";


export default (props) => {
    const onExpandClick = (e) => {
        e.preventDefault();
        props.onExpand();
    };

    const onLinkClick = (e) => {
        e.preventDefault();
        props.onClick(e.target.text.trim());
    };

    return (
        <ul className='mb-0 mr-3 p-0'>
            <li>Current {props.users.length === 1? 'User': 'Users'}}</li>
            {props.users.length > 0 ? props.users.map((user, index) => (
                <li key={index} className="list-group-item d-none d-sm-none d-md-block"
                >
                    <Link to={
                        {
                            pathname: '/chat'
                        }}
                          onClick={onLinkClick}
                    >{user.userName}</Link>
                </li>
            )) : 'Loading'}
            {
                props.hasMoreUsers &&
                <li onClick={onExpandClick}
                className='list-group-item d-none d-sm-none d-md-block'>
                    <Link to='/chat'>
                        ... show more
                    </Link>
                </li>
            }
        </ul>
    )
}
    
