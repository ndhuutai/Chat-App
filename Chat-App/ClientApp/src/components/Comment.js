import React from 'react';
import moment from 'moment';
import 'semantic-ui-css/components/comment.min.css';

const CommentContainer = (props) => (
    <li className='ui comments'>
        <div className='comment bg-light'>
            <a className='avatar'>
                <img src={props.avatarURL} alt=""/>
            </a>
            <div className='content'>
                <a className='author'>{props.user}</a>
                <div className='metadata'>
                    <span>{moment(props.createdAt).fromNow()}</span>
                </div>
                <div className='text'>{props.text}</div>
            </div>
        </div>
    </li>
);
export default CommentContainer;