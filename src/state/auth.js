import { createContext, useContext, useState } from 'react'

//Definindo um contexto para autenticação do usuário, o AuthContext é um componente que recebe um objeto
const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        logged: false,
        email:'',
    })

    return(
        //Acessando a proprieda Provider e passando o estado do usuário
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

//Criando um hook que define o uso do context criado
const useAuth = () => useContext(AuthContext)

export default useAuth