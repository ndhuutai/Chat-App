import React from 'react';
// import { Route } from 'react-router';
import {Route} from "react-router-dom";
import Layout from './components/Layout';
import Chat from './components/Chat'
import JoinPage from './components/JoinPage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Callback from "./components/Callback";


export default () => (
    <Layout>
        {/*<Route exact path='/register' component={RegisterPage}/>*/}
        <Route exact path='/' component={JoinPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/callback" component={Callback} />
        <Route path='/chat' component={Chat}/>
    </Layout>
);
