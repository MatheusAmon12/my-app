import { makeStyles } from "tss-react/mui"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import Toasty from "../../components/Toasty"

const useStyle = makeStyles()((theme) => ({
    wrapper:{
        margin: theme.spacing(3),
    }
}))



const Edit = () => {
    const { classes } = useStyle()
    const { id } = useParams()
    
    const [openToasty, setOpenToasty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
    
    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(response => {
                const { data } = response.data

                setForm({
                    name: {
                        value: data.first_name,
                        error: false,
                    },
                    job: {
                        value: '',
                        error: false,
                    },
                })
            })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,

            [name]: {
                value,
            }
        })
    }

    const handleEditButton = () => {
        setIsLoading(true)
        let hasError = false

        let newFormState = {
            ...form,
        }

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

        if (hasError){
            return setForm(newFormState)
        }

        axios.put(`https://reqres.in/api/users/${id}`, {
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
                    onClick={handleEditButton}
                >
                    {
                        isLoading ? 'Salvando' : 'Salvar'
                    }
                </Button>
            </div>
            <Toasty 
                open={openToasty} 
                severity="success" 
                message="Cadastro atualizado com sucesso"
                onClose={() => setOpenToasty(false)}
            />
        </>
    )
}

export default Edit