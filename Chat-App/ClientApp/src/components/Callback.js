import React from 'react';
import * as Oidc from 'oidc-client';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setAuthenticated, setSub, setUserName} from '../actions/User';


class Callback extends React.Component {
    state = {
        redirectUrl: '',
        countDown: 5
    };

    componentDidMount() {
        new Oidc.UserManager({
            response_mode: 'query'
        }).signinRedirectCallback().then((user) => {
            this.setState({redirectUrl: '/'});
            this.props.setAuthenticated(!!user);
            this.props.setSub(user.profile.sub);
            this.props.setUserName(user.profile.name);
        }).catch(e => console.log(e));
        
        new Oidc.UserManager({response_mode: 'query'}).signoutRedirectCallback().then(user => {
            console.log('in HERE', user);
            this.props.setAuthenticated(!!user);
        }).catch(e => console.log({e}))
        
        
    }

    render() {
        // setTimeout(() => {
        //     this.setState({countDown: this.state.countDown - 1});
        // }, 1000);
        return (
            <div>
                <p>You are logged in. Redirecting
                    in {this.state.countDown > 1 ? `${this.state.countDown} seconds` : `${this.state.countDown} second`}</p>
                {this.state.countDown === 0 ? <Redirect to={this.state.redirectUrl}/> : ''}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthenticated,
    setSub,
    setUserName
}, dispatch);


export default connect(undefined, mapDispatchToProps)(Callback);

