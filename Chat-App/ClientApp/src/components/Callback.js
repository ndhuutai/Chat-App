import React from 'react';
import * as Oidc from 'oidc-client';
import { Redirect } from "react-router-dom";

//
// const signinRedirectPromise = () => {
//         console.log('sadfsadf');
//         new Oidc.UserManager({
//             response_mode : "query"
//         }).signinRedirectCallback().then(() => {
//             window.location = "/"
//         }).catch( e => {
//             return <div>{e}</div>
// })
// };


export default class Callback extends React.Component {
    state = {
        redirectUrl : '',
        countdown : 5
    };
    
    componentDidMount() {
       new Oidc.UserManager({
           response_type: 'query'
       }).signinRedirectCallback().then(() => {
           this.setState({redirectUrl: '/'})
       })
    }
    
    render() {
        return (
            <div>
                You were logged in.
                {setTimeout(() => {
                    
                })}
                {this.state.redirectUrl? '': <Redirect to={this.state.redirectUrl}/>}
            </div>
        )
    }
}

// export default () => (
//    
//    
//     <div>
//         you were logged in.
//         {signinRedirectPromise()}
//         {/*<Redirect to={"/"}/>*/}
//     </div>
// )