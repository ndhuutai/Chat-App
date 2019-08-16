import React from 'react';
import {Link} from 'react-router-dom';

export default (props) => (
    <ul className='mb-0 mr-3 p-0 list-group'>
        <li className='list-group-item list-group-item-heading d-none d-sm-none d-md-block'>Joined {props.groups.length === 1 ? 'Group' : 'Groups'}</li>
        {props.groups.map((group, index) => {
            return (
                <li key={index}
                        className='list-group-item list-group-item-action d-none d-sm-none d-md-block text'
                        onClick={props.onGroupClick}
                >
                    <Link to={'/chat'}>{group.name}</Link>
                </li>
            )
        })}
    </ul>
)