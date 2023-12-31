import Container from "@mui/material/Container"
import { makeStyles } from "tss-react/mui"

import Header from "../partials/Header/Header"
import useAuth  from "../state/auth"

const useStyles = makeStyles()(() => ({
    container: {
        padding: '15px 0',
    }
}))

const Default = ({ children }) => {
    const { classes } = useStyles()

    //Chamando apenas o user, porque não será necessário definir usuário aqui, apenas utilizar do valor.
    const { user } = useAuth()

    return(
        <>
            <Header user={user}/>
            <Container className={classes.container}>
                {children}
            </Container>
        </>
    )
}

export default Default