import React from 'react';
// import { Route } from 'react-router';
import {Route} from "react-router-dom";
import Layout from './components/Layout';
import Chat from './components/Chat'
import Home from './components/Home'
import JoinPage from './components/JoinPage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Callback from "./components/Callback";


export default () => (
    <Layout>
        {/*<Route exact path='/register' component={RegisterPage}/>*/}
        <Route exact path='/' component={Home}/>
        <Route path='/join' component={JoinPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/callback" component={Callback}/>
        <Route path='/chat' component={Chat}/>
    </Layout>
);
