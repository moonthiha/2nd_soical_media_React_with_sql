import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DarkContextProvider from './contexts/themeContext.jsx'
import axios from 'axios';
import AuthUserProvider from './contexts/AuthContext.jsx';
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthUserProvider>
      <DarkContextProvider>
        <App />
      </DarkContextProvider>
    </AuthUserProvider>
)
