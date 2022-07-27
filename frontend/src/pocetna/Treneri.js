import { useState, useEffect, useContext } from 'react'
import { GetData } from '../komponente/Fetch'
import CircularProgress from '@mui/material/CircularProgress';
import { Card, CardMedia, CardContent, Typography, Button, Grid, filledInputClasses } from '@mui/material';
import { Box } from '@mui/system';
import { UserContext } from '../context/UserContext';
import Modal from '../komponente/Modal'
import LogIn from './LoginForma';
import Register from './RegisterForma';
import FormaZakaziPersonalni from '../komponente/Forme/FormaZakaziPersonalni';

const PUTANJA = 'http://localhost:8800/'

const Treneri = () => {
    // console.log(PUTANJA)

    const [sviTreneri, setTreneri] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)

    useEffect(() => {
        GetData("http://localhost:8800/api/trener/vidiTrenereSvi", setTreneri, setGreska, setIsLoading)
    }, [])

    const { user, dispatch } = useContext(UserContext);

    const [trenerId, setTrenerId] = useState('')

    return (
        <Box>
            {isLoading && <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>}


            {sviTreneri.map((tr, i) => (
                <Card key={i} sx={{ margin: '5vh 5vw' }}>
                    <Grid container >

                        <Grid item xs={12} sm={4}>
                            <CardMedia
                                component="img"
                                crossOrigin="anonymous"
                                src={PUTANJA + tr.slika}
                                alt={tr.ime}
                                className="trImg"
                                onClick={() => { console.log(PUTANJA + tr.slika) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <CardContent id={i} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                                <Box sx={{ flexGrow: '1' }}>
                                    <Typography component="div" variant="h6">
                                        {tr.ime} {tr.prezime}
                                    </Typography>
                                    <Typography component="div" variant="subtitle2" >
                                        Sertifikovan za: {
                                            tr.sertifikati.map((s, i) => (
                                                <Typography variant="body2" key={i}>{s}</Typography >
                                            ))
                                        }
                                    </Typography>

                                    <Typography component="div" variant="subtitle2" >
                                        Iskustvo: {
                                            tr.iskustvo.map((is, i) => (
                                                <Typography variant="body2" key={i}>{is}, </Typography>
                                            ))
                                        }
                                    </Typography>
                                    <Typography component="div" variant="subtitle2" >
                                        Opis:
                                        <Typography variant="body2"> {tr.opis}</Typography>

                                    </Typography>
                                </Box>

                                <Button fullWidth variant="contained" onClick={() => { setZakazi(true); setTrenerId(tr.id); }}>Zakazi trening</Button>

                                {zakazi && <Modal onClose={() => { setZakazi(false) }}>

                                    {user ? <FormaZakaziPersonalni idTrenera={trenerId} onClose={() => { setZakazi(false); }} /> : (login ? <Box><LogIn />
                                        <Typography variant="caption" component="div" textAlign="center">Nemate nalog?
                                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                                        </Typography>
                                    </Box>
                                        :
                                        <Box><Register />
                                            <Typography variant="caption" component="div" textAlign="center">Imate nalog?
                                                <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                                            </Typography>
                                        </Box>)
                                    }

                                </Modal>}
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            ))}

        </Box>
    )
}
export default Treneri;