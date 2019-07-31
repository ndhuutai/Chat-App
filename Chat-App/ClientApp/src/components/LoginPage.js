import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {UserManager} from '../oidc-client/config';

class LoginPage extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        UserManager.signinRedirect();
    };

    render() {
        {
            UserManager.getUser().then(user => {
                if (user) {
                    console.log("user logged in", user.profile);
                } else {
                    console.log("user not logged in");
                }
            })
        }

        return (
            <Fragment>
                <form className="w-50 m-auto" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username"
                               className="m-0 p-0">Username</label>
                        <input type="text"
                               className="form-control"
                               name="username"
                               id="username"
                               placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"
                               className="p-0 m-0">Password</label>
                        <input type="text"
                               className="form-control"
                               id="password"
                               placeholder="password"/>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </Fragment>
        )
    }
}

//
// (<Form onSubmit={this.onLogin}>
//     <Form.Field>
//         <label>Username</label>
//         <input placeholder='username'/>
//     </Form.Field>
//     <Form.Field>
//         <label>Password</label>
//         <input type='password' placeholder='Password'/>
//     </Form.Field>
//     <Button type='submit'>Submit</Button>
// </Form>)

export default connect()(LoginPage);



