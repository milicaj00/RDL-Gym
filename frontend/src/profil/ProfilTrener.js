import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Box from '@mui/material/Box';
import { UserContext } from '../context/UserContext';
import { Typography, Card, CardMedia, CardContent, Grid, Button, CardActions, IconButton, Paper } from '@mui/material';
import { GetData } from '../komponente/Fetch';
import Modal from '../komponente/Modal';
import IzmeniLozinku from '../komponente/Inputi/IzmeniLozinku'
import KalendarForma from '../komponente/Tabele/KalendarForma';
import FormaDodajTermin from '../komponente/Forme/FormaDodajTermin';
import NapraviGrupni from '../komponente/Forme/FormaNapraviGrupni'
import useAxiosPrivate from "../api/useAxiosPrivate";

const PUTANJA = 'http://localhost:8800/'

const Trener = (props) => {
    const axiosPrivate = useAxiosPrivate();

    const { user } = useContext(UserContext);
    const [izmena, setIzmena] = useState(false)
    const [noviTrening, setNoviTrening] = useState(false)
    const [noviTermini, setNoviTermini] = useState(false)

    return (

        <Box className='marginS'>
            <Grid container spacing={2}>
                {/* <KorisniciTrenera/> */}
                <Grid item xs={12} md={3}>
                    <Card className='cardShadow' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                    <CardMedia
                            component="img"
                            crossOrigin="anonymous"
                            image={PUTANJA + user.slika}
                            alt={user.ime}
                            className='imgTrProfil'
                        />
                        <CardContent sx={{ flexGrow: '1' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                {user.ime} {user.prezime}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                E-mail: {user.email}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="text.secondary">
                                Broj telefona: {user.brojTelefona}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Sertifikovan za: {
                                    user.sertifikati.map((s, i) => (
                                        <Typography variant="body2" key={i}>{s}</Typography >
                                    ))
                                }
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            {!izmena && <Button variant="contained" size="small" onClick={() => { setIzmena(true) }}>Promeni lozinku</Button>}
                            {izmena && <IzmeniLozinku onClose={() => { setIzmena(false) }} />}

                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper sx = {{minHeight:'100%',display: 'flex', flexDirection: 'column'}}>

                            <KalendarForma idTrenera={user.trenerId} />

                        {noviTrening
                            &&
                            <Modal onClose={() => { setNoviTrening(false) }}>
                                <NapraviGrupni idTrenera={user.trenerId} grupni={true} onClose={() => { setNoviTrening(false) }} />
                            </Modal>}

                        {noviTermini
                            &&
                            <Modal open ={noviTermini}  onClose={() => { setNoviTermini(false) }}>
                                <FormaDodajTermin idTrenera={user.trenerId} onClose={() => { setNoviTermini(false) }} />
                            </Modal>
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row',flexGrow: '1', padding:{xs:'2% 2%', sm:'2% 2%',md:'1% 20%'}, alignItems: 'flex-end' }}>
                            <Button fullWidth sx = {{mr: 1}} variant="contained" onClick={() => setNoviTrening(true)}>Zakazi grupni trening</Button>
                            <Button fullWidth variant="contained" onClick={() => setNoviTermini(true)}>Unesi nove termine</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>


        </Box>
    );
}

export default Trener