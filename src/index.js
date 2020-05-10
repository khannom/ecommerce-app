import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';

import './index.css';
import App from './App';

//Provider es lo que nos proporciona las funcionalidades de redux, tiene que ser el padre de todo
//para que funcione.
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
