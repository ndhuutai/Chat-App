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

// (<li className='media ml-2 p-0'>
//     <div className='row pl-2'>
//         <div className={`p-0 col-3 p-3 align-items-center ${props.avatarURL ? '' : 'd-none'}`}>
//             <img src={props.avatarURL || ''} alt="" className='mr-3 img-fluid'
//             />
//         </div>
//         <div className={`media-body col-9`}>
//             <div className='mt-0 mb-1'>{props.user}</div>
//             <div className='text-wrap'>{props.text}</div>
//         </div>
//     </div>
// </li>)


{/*<Comment>*/}
{/*    <Comment.Avatar src={props.avatarURL} />*/}
{/*    <Comment.Content>*/}
{/*        <Comment.Author as='a'>{props.user}</Comment.Author>*/}
{/*        <Comment.Metadata>*/}
{/*            <div>{moment(props.createdAt).fromNow()}</div>*/}
{/*        </Comment.Metadata>*/}
{/*        <Comment.Text>{props.text}</Comment.Text>*/}
{/*        <Comment.Actions>*/}
{/*            <Comment.Action as='a'>Reply</Comment.Action>*/}
{/*        </Comment.Actions>*/}
{/*    </Comment.Content>*/}
{/*</Comment>*/}


export default CommentContainer;