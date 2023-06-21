import { useEffect, useState } from "react"
import axios from "axios"
import Grid from '@mui/material/Grid'
import { makeStyles } from "tss-react/mui"

import CustomerCard from "../components/CustomerCard"

const useStyles = makeStyles()((theme) => ({
    card: {
        margin: theme.spacing(2)
    }
}))

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const { classes } = useStyles()

    useEffect(() => {
        axios.get('https://reqres.in/api/users')
            .then(response => {
                const { data } = response.data//retorna um objeto, por isso a desestruturação

                setCustomers(data)
            })
    }, [])

    return(
        <>
            <h1>Clientes</h1>

            <Grid container>
                {
                    customers.map(client => (
                        <Grid item xs={12} md={4}>
                            <CustomerCard
                                name={client.first_name}
                                lastname={client.last_name}
                                email={client.email}
                                avatar={client.avatar}
                                className={classes.card}
                            />
                        </Grid>
                    ))
                }
            </Grid>

        </>
        
    )
}

export default Customers