import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import AuthProvider from './context/auth/auth'
import { RecipeProvider } from './context/recipe/recipe.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <RecipeProvider>
                <ToastContainer />
                <App />

            </RecipeProvider>
        </AuthProvider>

    </BrowserRouter>


)
