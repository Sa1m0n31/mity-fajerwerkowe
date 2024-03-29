import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";

axios.defaults.baseURL = 'https://test-mity.skylo-test3.pl';
// axios.defaults.baseURL = 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
