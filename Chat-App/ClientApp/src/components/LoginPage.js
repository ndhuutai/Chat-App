import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {UserManager} from '../oidc-client/config';

class LoginPage extends React.Component {
    
    state = {
        loggedIn : false
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        UserManager.signinRedirect();
    };
    
    componentDidMount() {
        UserManager.getUser().then(user => {
            this.setState({loggedIn: !!user});
        })
    }

    render() {
        return (
            <Fragment>
                <div>{`${this.state.loggedIn}`}</div>
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

export default connect()(LoginPage);



