import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../client/pages/App';
// import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// IMPORT MAIN SCSS FILE
import './stylesheets/application.scss';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
// RENDER APP
root.render(
    <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            {/* <BrowserRouter> */}
            <App />
            <ReactQueryDevtools />
            {/* </BrowserRouter> */}
        </QueryClientProvider>
    </React.StrictMode>
);

