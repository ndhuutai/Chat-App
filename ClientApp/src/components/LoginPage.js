import React from 'react';
import {Button, Form} from 'semantic-ui-react';
import {connect} from 'react-redux';


class LoginPage extends React.Component {
	render() {
		return (
			<Form onSubmit>
				<Form.Field>
					<label>Username</label>
					<input placeholder='username'/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<input type='password' placeholder='Password'/>
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default connect()(LoginPage);



