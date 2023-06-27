import { useEffect, useState } from "react"
import axios from "axios"
import Grid from '@mui/material/Grid'
import { makeStyles } from "tss-react/mui"

import CustomerCard from "../../components/CustomerCard"

const endPoint = 'https://reqres.in/api/users'

const useStyles = makeStyles()((theme) => ({
    card: {
        margin: theme.spacing(2)
    }
}))


const List = () => {
    const [customers, setCustomers] = useState([])
    const { classes } = useStyles()
    
    useEffect(() => {
        axios.get(endPoint)
        .then(response => {
            const { data } = response.data//retorna um objeto, por isso a desestruturação
            
            setCustomers(data)
        })
    }, [])
    
const handleRemoveCustomer = (id) => {
    axios.delete(endPoint + `/${id}`)
        .then(() => {
            const newCustomers = customers.filter(client => client.id !== id)

            setCustomers(newCustomers)
        })
}
    return(
        <Grid container>
            {
                customers.map(client => (
                    <Grid item xs={12} md={4}>
                        <CustomerCard
                            id={client.id}
                            name={client.first_name}
                            lastname={client.last_name}
                            email={client.email}
                            avatar={client.avatar}
                            className={classes.card}
                            onRemoveCustomer={handleRemoveCustomer}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default List