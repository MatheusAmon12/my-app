import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    List,
} from '@mui/material'
import { Home, PersonAdd } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu'
import useStyles from './Header.style' //importações de css por último


const Header = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { classes } = useStyles()
  const redirect = useNavigate()

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClick = (url) => {
    redirect(url)
    handleToggleMenu()
  }

  const handleOnClickLogin = (url) => {
    redirect(url)
  }

    return(
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className={classes.background}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => handleToggleMenu()}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My App 
              </Typography>
              {
                user.logged
                  ? <Typography variant='h6'>{user.email}</Typography>
                  : <Button color="inherit" onClick={() => handleOnClickLogin('/login')}>Login</Button>
              }
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer open={menuOpen} onClose={() => handleToggleMenu()}>
          <List>
            <ListItemButton onClick={() => handleClick('/')}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText>
                Página Inicial
              </ListItemText>
            </ListItemButton>

            <ListItemButton onClick={() => handleClick('/customers')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>
                Lista de Clientes
              </ListItemText>
            </ListItemButton>

            <ListItemButton onClick={() => handleClick('/customers/add')}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>
                Cadastro de Clientes
              </ListItemText>
            </ListItemButton>
          </List>
        </Drawer>
      </>
    )
}

export default Header