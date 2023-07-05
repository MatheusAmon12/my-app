import { useState } from 'react'
import { makeStyles } from 'tss-react/mui'
import { TextField, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useAuth from '../state/auth'

const useStyles = makeStyles()((theme) => ({
    wrapper: {
        margin: theme.spacing(3),
    }
}))

const Login = () => {
    const {classes} = useStyles()

    const redirect = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    //O hook funciona exatamente como o useState. Ele retorna o Context, AuthProvider criados em auth.js
    //Chamei apenas o setUser porque não utilizei do estado atual do user
    const { setUser } = useAuth()

    const handleInputChange = e => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleFormSubmit = () => {
        setIsLoading(true)

        setTimeout(() => {
            //Defininfo o estado global
            setUser({
                logged: true,
                email: form.email
            })

            redirect('/')
        }, 4000)
    }

    return(
        <>
            <div className={classes.wrapper}>
                <TextField
                    onChange={handleInputChange}
                    label='Digite seu e-mail'
                    name='email'
                />
            </div>
            <div className={classes.wrapper}>
                <TextField
                    onChange={handleInputChange}
                    label='Digite sua senha'
                    name='password'
                    type='password'
                />
            </div>
            <div className={classes.wrapper}>
                <Button 
                    variant='contained' 
                    color='primary'
                    onClick={handleFormSubmit}
                >
                    {
                        isLoading 
                            ? 'Aguarde...'
                            : 'Entrar'
                    }
                </Button>
            </div>
        </>
    )
}

export default Login