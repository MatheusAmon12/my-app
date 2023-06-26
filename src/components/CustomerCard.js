//método para adicionar várias classes simultâneas
import { useState } from 'react'
import classNames from 'classnames'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import { red } from '@mui/material/colors'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import ModalConfirm from './ModalConfirm'


const CustomerCard = ({
  id,
  name,
  lastname,
  email,
  avatar,
  className,
  onRemoveCustomer,
}) => {

  const[openModal, setOpenModal] = useState(false)
  const handleToggleOpenModal = () => {
    setOpenModal(!openModal)
  }
  const handleConfirmModal = (id) => {
    onRemoveCustomer(id)
    handleToggleOpenModal()
  }
  const handleRemoveCustomer = () => {
    handleToggleOpenModal()
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={classNames(className)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatar}>
              R
            </Avatar>
          }
          title={`${name} ${lastname}`}
          subheader={email}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="remover cadastro" onClick={handleRemoveCustomer}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="editar cadastro">
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
      <ModalConfirm 
        open={openModal}
        onClose={handleToggleOpenModal}
        onConfirm={() => handleConfirmModal(id)}
        title={'Deseja realmente excluir este cadastro?'}
        message={'Ao exluí-lo não será possível acessar todas informações relacionadas, bem como restaurá-lo!'}
      />
    </>
  )
}

export default CustomerCard