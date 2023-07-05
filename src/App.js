import { Outlet } from 'react-router-dom'
import { AuthProvider } from './state/auth'

const App = () => {
  return (
    //Ao envolver a aplicação com o componente AuthProvider estou definindo que toda aplicação tenha acesso ao estado criado com o useAuth
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}

export default App