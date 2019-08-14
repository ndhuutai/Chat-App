import React from 'react';

export default (props) => (
    <div>
        <ul className='mb-0 mr-3 p-0 list-group'>
            <li>Joined {props.groups.length === 1? 'Group': 'Groups'}</li>
            {props.groups.map((group, index) => {
                return (
                    <li key={index}
                    className = 'list-group-item d-none d-sm-none d-md-block'
                    >{group.name}</li>
                )
            })}
        </ul>
    </div>
)