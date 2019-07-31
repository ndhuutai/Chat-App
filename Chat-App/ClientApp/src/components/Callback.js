import React from 'react';
import * as Oidc from 'oidc-client';
import { Redirect } from "react-router-dom";


export default () => (
    <div>
        Logging you in
        {
            new Oidc.UserManager({ 
                response_mode : "query"
            }).signinRedirectCallback().then(() => {
                return <Redirect to="/"/>
            }).catch( e => {
                console.log(e);
            })
        }
    </div>
)