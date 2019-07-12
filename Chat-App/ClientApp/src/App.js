import React from 'react';
// import { Route } from 'react-router';
import {Route} from "react-router-dom";
import Layout from './components/Layout';
import Chat from './components/Chat'
import JoinPage from './components/JoinPage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';


export default () => (
    <Layout>
        {console.log('im in here')}
        {/*<Route exact path='/' component={LoginPage}/>*/}
        {/*<Route exact path='/register' component={RegisterPage}/>*/}
        <Route exact path='/' component={JoinPage}/>
        <Route path='/chat' component={Chat}/>
    </Layout>
);
