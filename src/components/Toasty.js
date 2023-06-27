import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Toasty = ({open, severity, message, onClose}) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        onClose()
    }

  return (
    <Snackbar 
        open={open} 
        autoHideDuration={6000}
        onClose={handleClose}
    >
        <MuiAlert severity={severity} sx={{ width: '100%' }}>
            {message}
        </MuiAlert>
    </Snackbar>
  )
}

export default Toasty