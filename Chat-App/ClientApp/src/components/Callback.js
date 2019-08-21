import React from 'react';
import * as Oidc from 'oidc-client';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setAuthenticated, setSub} from '../actions/User';


class Callback extends React.Component {
    state = {
        redirectUrl: '',
        countDown: 5
    };

    componentDidMount() {
        new Oidc.UserManager({
            response_mode: 'query'
        }).signinRedirectCallback().then((user) => {

            setTimeout(() => {
                this.setState({countDown: this.state.countDown - 1});
            }, 1000);
            
            this.setState({redirectUrl: '/'});
            this.props.setAuthenticated(!!user);
            this.props.setSub(user.profile.sub);
        }).catch(e => console.log(e));
    }

    render() {
        
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
    setSub
}, dispatch);


export default connect(undefined, mapDispatchToProps)(Callback);

