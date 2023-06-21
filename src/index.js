import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material"
import { teal, cyan } from "@mui/material/colors"

import TemplatePage from './templates/Page'
import Home from './pages/Home'
import Customers from './pages/Customers'
import "./index.css"

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
        element: <TemplatePage title="Página Inicial" Component={Home} />
      },
      {
        path: "/customers",
        element: <TemplatePage title="Clientes" Component={Customers} />
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