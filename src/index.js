import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import { teal, cyan } from '@mui/material/colors'

import TemplateDefault from './templates/Default'
import TemplatePage from './templates/Page'
import TemplateClean from './templates/Clean'
import Home from './pages/Home'
import CustomersList from './pages/customers/List'
import CustomersRegister from './pages/customers/Register'
import CustomersEdit from './pages/customers/Edit'
import Login from './pages/Login'
import './index.css'

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
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        //Fazendo uso do template dedicado às páginas
        element: <TemplateDefault>
                  <TemplatePage title='Página Inicial' Component={Home} />
                 </TemplateDefault>,
      },
      {
        path: '/customers',
        element: <TemplateDefault>
                    <TemplatePage title='Lista de Clientes' Component={CustomersList} />
                 </TemplateDefault>
      },
      {
        path: '/customers/add',
        element: <TemplateDefault>
                    <TemplatePage title='Cadastro de Clientes' Component={CustomersRegister} />
                 </TemplateDefault>
      },
      {
        path: '/customers/edit/:id',
        element: <TemplateDefault>
                    <TemplatePage title='Editar Clientes' Component={CustomersEdit} />
                 </TemplateDefault>
      },
      {
        path: '/login',
        element: <TemplateClean>
                    <TemplatePage title='Acesso Restrito' Component={Login} />
                 </TemplateClean>
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