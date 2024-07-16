import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResultPage from "./page/ResultPage.tsx";

const router = createBrowserRouter([
    {
        path: "/trivia-quiz/",
        element: <App/>,
    },
    {
        path: "/trivia-quiz/results/",
        element: <ResultPage/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
