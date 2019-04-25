import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';
var randomAvatar = require('random-avatar')



const CommentContainer = (props) => (
    <Comment>
          <Comment.Content>
            <Comment.Author as='a'>Matt</Comment.Author>
            <Comment.Metadata>
              <div>{moment(props.createdAt).fromNow()}</div>
            </Comment.Metadata>
            <Comment.Text>{props.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action as='a'>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
    </Comment>
);

export default CommentContainer