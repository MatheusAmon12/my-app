import Container from "@mui/material/Container"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()(() => ({
    container: {
        padding: '15px 0',
    }
}))

const Clean = ({ children }) => {
    const { classes } = useStyles()

    return(
        <>
            <Container className={classes.container}>
                {children}
            </Container>
        </>
    )
}

export default Clean