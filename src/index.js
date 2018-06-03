import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//https://burger-builder-944f7.firebaseio.com/

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
