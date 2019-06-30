import React from 'react';
import CommentContainer from "./Comment";
import {Comment} from "semantic-ui-react";

export default (props) => (
    <Comment.Group>

        {props.comments.map((comment, index) => (
            <CommentContainer key={index} {...comment}/>
        ))}
    </Comment.Group>
)
