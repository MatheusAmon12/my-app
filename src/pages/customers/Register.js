import { makeStyles } from "tss-react/mui"
import { useState } from "react"
import axios from "axios"
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import Toasty from "../../components/Toasty"

const useStyle = makeStyles()((theme) => ({
    wrapper:{
        margin: theme.spacing(3),
    }
}))



const Register = () => {
    const { classes } = useStyle()

    const [form, setForm] = useState({
        name: {
            value: '',
            error: false,
        },
        job: {
            value: '',
            error: false,
        },
    })

    //Utilizando esta forma de validação o processo fica mais complexo. Então posso aproveitar o estado do formulário acima para utilizar destas propriedades.
    /*
    const [error, setError] = useState({
        name: {
            error: false,
            helperText: ''
        },
        job: false,
    })
    */

    const [openToasty, setOpenToasty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,

            [name]: {
                value,
            }
        })
    }

    const handleRegisterButton = () => {
        //Toda função de atualizar estado é assíncrona. Por isso este trecho de código não funciona corretamente. Pois enquanto um pode ter alterado o estado, o outro não. Então o resultado da verificação acaba não sendo correto.
        /*
        if (!form.name.value){
            setForm({
                ...form,
                name:{
                    ...form.name,
                    error: true,
                }
            })
        }

        if (!form.job.value){
            setForm({
                ...form,
                job:{
                    ...form.job,
                    error: true,
                }
            })
        }
        */

        //Para resolver o problema do assíncronismo é preciso chamar o setForm uma única vez. Por isso criei uma variável que contém todos os dados do form
        setIsLoading(true)
        let hasError = false

        let newFormState = {
            ...form,
        }

        //Atualizando o newFormState
        if (!form.name.value){
            hasError = true

            newFormState.name = {
                value: form.name.value,
                error: true,
                helperText: 'Digite o campo nome corretamente',
            }
        }

        if (!form.job.value){
            hasError = true

            newFormState.job = {
                value: form.job.value,
                error: true,
                helperText: 'Digite o campo cargo corretamente',
            }
        }

        //Para garantir que só irá atualizar o estado do form quando houver erro é preciso criar uma flag para controlar isso

        if (hasError){

            //uma boa prática é fazero retorno do setForm e realizar o Axios abaixo, pois se não houver error o interpretador já sai da função e não faz request da API

            return setForm(newFormState)
        }

        axios.post('https://reqres.in/api/users', {
            name: form.name.value,
            job: form.job.value,
        })
            .then(() => {
                setOpenToasty(true)
                setIsLoading(false)
            })

    }

    return(
        <>
            <div className={classes.wrapper}>
                <TextField
                    error={form.name.error}
                    helperText={form.name.helperText}
                    label="Digite seu nome" 
                    name="name" 
                    value={form.name.value} 
                    onChange={handleInputChange}
                />
            </div>
            <div className={classes.wrapper}>
                <TextField
                    error={form.job.error}
                    helperText={form.job.helperText}
                    label="Digite seu cargo" 
                    name="job" 
                    value={form.job.value} 
                    onChange={handleInputChange}
                />
            </div>
            <div className={classes.wrapper}>
                <Button 
                    color='primary' 
                    variant='contained'
                    disabled={isLoading} 
                    onClick={handleRegisterButton}
                >
                    {
                        isLoading ? 'Cadastrando' : 'Cadastrar'
                    }
                </Button>
            </div>
            <Toasty 
                open={openToasty} 
                severity="success" 
                message="Cadastro realizado com sucesso"
                onClose={() => setOpenToasty(false)}
            />
        </>
    )
}

export default Register