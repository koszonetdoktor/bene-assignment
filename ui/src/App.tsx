import React, { useState, useEffect } from 'react';
import axios from "./utils/axios"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from "./screens/login"
import Cities from "./screens/cities"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducer, { State } from "./reducers"
import { Provider } from "react-redux"
import withAuthentication from './components';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/cities" component={withAuthentication(Cities)} />
            </Router>
        </Provider>
    );
}

export default App;