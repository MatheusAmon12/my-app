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
import CustomersList from './pages/customers/List'
import CustomersRegister from './pages/customers/Register'
import CustomersEdit from './pages/customers/Edit'
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
        //Fazendo uso do template dedicado às páginas
        element: <TemplatePage title="Página Inicial" Component={Home} />
      },
      {
        path: "/customers",
        element: <TemplatePage title="Lista de Clientes" Component={CustomersList} />
      },
      {
        path: "/customers/add",
        element: <TemplatePage title="Cadastro de Clientes" Component={CustomersRegister} />
      },
      {
        path: "/customers/edit/:id",
        element: <TemplatePage title="Editar Clientes" Component={CustomersEdit} />
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