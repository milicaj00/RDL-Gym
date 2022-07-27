import React, { useContext, useState } from 'react'
import Menu from '@mui/material/Menu';
import Delete from '@mui/icons-material/Delete';
import { DeleteMetoda } from '../Fetch';
import { ListItemText, Typography, ListItem, Divider, Box, ListItemIcon, ButtonBase } from '@mui/material';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import CheckIcon from '@mui/icons-material/Check';
import { UserContext } from '../../context/UserContext';

const Obavestenja = ({ handleClose, open, menuItems, anchorEl, refresh }) => {
  //console.log(menuItems)

  const { user } = useContext(UserContext)

  const axiosPrivate = useAxiosPrivate()


  const obrisiZahtev = async (id) => {
    const zahtev = {
      url: 'http://localhost:8800/api/zahtev/obrisiZahtev/' + id
    }

    try {
      await axiosPrivate.delete('http://localhost:8800/api/zahtev/obrisiZahtev/' + id)

    } catch (err) {
      alert('Doslo je do greske')
    }

    refresh()
    handleClose()
  }

  const promeniTrening = async (poruka, idTreninga, idZahteva) => {

    console.log(idTreninga)
    const niz = poruka.split(' , ')
    const trening = niz[1].split(' ; ')
    console.log(trening)

    try {
      await axiosPrivate.put('http://localhost:8800/api/trening/prihvatiIzmene', {
        idTreninga: idTreninga,
        idZahteva: idZahteva,
        idKorisnika: user.korisnikId,
        intenzitet: trening[0],
        tip: trening[1],
        trajanje: trening[2]
      })

    } catch (err) {
      console.log(err.response.data)
      alert('Doslo je do greske')
    }

    refresh()
    handleClose()
  }

  return (
    <Menu
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
    >

      {menuItems.map((item) => (
        <Box key={item._id}>
          <ListItem
            alignItems="flex-start"
          >
            <ListItemText
              secondary={
                <Typography
                  component="div"
                  variant="body2"
                  color="text.primary"
                >
                  {item.poruka ? item.poruka : "Novi zahtev"}

                </Typography>
              }
            />
            {
              item.predlog && <ButtonBase className='cardCenter' sx={{ marginTop: '0%', marginLeft: '2px', minWidth: '0px' }}>
                <CheckIcon onClick={() => { promeniTrening(item.poruka, item.treningId, item._id) }} />
              </ButtonBase>
            }

            <ButtonBase className='cardCenter' sx={{ marginTop: '0%', marginLeft: '2px', minWidth: '0px' }}>
              <Delete onClick={() => { obrisiZahtev(item._id) }} />
            </ButtonBase>

          </ListItem>
          <Divider />
        </Box>
      ))}
    </Menu>

  )
}

export default Obavestenja