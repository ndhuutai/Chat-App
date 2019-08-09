import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <Fragment>
        <div className='jumbotron'>
            <h1 className='display-4'>Real-time Chat Application</h1>
            <p>This app was built using ASP.NET Core, SignalR, Web API, Entity Framework combining with IdentityServer4
                and React + Redux.</p>
            <hr className='my-4'/>
            <p>It allows user to chat in public group, private group, and also message privately to one other user. It
                delivers message in real-time using SignalR while saving other important data through normal Web API
                calls</p>
            <Link to='/join'>
                <button className='btn btn-primary btn-lg'
                        role='button'>Join A Room Now!
                </button>
            </Link>
        </div>
    </Fragment>
)