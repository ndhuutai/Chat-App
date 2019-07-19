import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';



const CommentContainer = (props) => (
  <li className='media row'>
      <div className='col-2'>
        <img src={props.avatarURL || ''} alt="" className='mr-3 img-fluid align-self-center'/>
      </div>
      <div className='media-body col-10'>
          <div className='mt-0 mb-1'>{props.user}</div>
          <div className='text-wrap'>{props.text}</div>
      </div>
  </li>
);


// (<Comment>
//     <Comment.Avatar src={props.avatarURL} />
//     <Comment.Content>
//         <Comment.Author as='a'>{props.user}</Comment.Author>
//         <Comment.Metadata>
//             <div>{moment(props.createdAt).fromNow()}</div>
//         </Comment.Metadata>
//         <Comment.Text>{props.text}</Comment.Text>
//         <Comment.Actions>
//             <Comment.Action as='a'>Reply</Comment.Action>
//         </Comment.Actions>
//     </Comment.Content>
// </Comment>)
export default CommentContainer