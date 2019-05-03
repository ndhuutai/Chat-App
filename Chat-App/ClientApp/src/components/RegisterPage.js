import React from 'react';
import {Button, Form} from 'semantic-ui-react';


class RegisterPage extends React.Component {
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
				<Form.Field>
					<label>Confirm Password</label>
					<input type='password' placeholder='Password'/>
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
		)
	}
}

export default RegisterPage;