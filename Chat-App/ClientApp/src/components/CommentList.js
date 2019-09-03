import React from 'react';
import Comment from "./Comment";

export default (props) => (
    <ul className='list-unstyled'>
        {props.comments.map((comment, index) => (
            <Comment key={index} {...comment}/>
        ))}
    </ul>
)
