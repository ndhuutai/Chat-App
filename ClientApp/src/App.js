import React from 'react';
// import { Route } from 'react-router';
import { Route } from "react-router-dom";
import Layout from './components/Layout';
import Chat from './components/Chat'
import JoinPage from './components/JoinPage'

export default () => (
    <Layout>
        <Route exact path='/' component={JoinPage} />
        <Route exact path='/chat' component={Chat} />
    </Layout>
);
