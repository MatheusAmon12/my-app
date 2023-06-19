import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home'
import "./index.css"
import App from './App';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material"
import { teal, cyan } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: cyan[500],
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>
);