import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../client/pages/App';
import { BrowserRouter } from 'react-router-dom';
// IMPORT MAIN SCSS FILE
import './stylesheets/application.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
// RENDER APP
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

