import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Button from '@mui/material/Button';
import Modal from '../../komponente/Modal'
import DodajNapredak from '../../komponente/Forme/FormaDodajNapredak';
import { Card, CardContent, Typography, CardActions, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import NapredakGrafici from '../../komponente/NapredakGrafici';
import { Box } from '@mui/system';
import useAxiosPrivate from '../../api/useAxiosPrivate';



const KorisnikVeliko = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const location = useLocation();

    const k = location.state

    console.log(k)

    const [napredak, setNapredak] = useState(false)

    const [nizNapredaka, setNizNapredak] = useState([])
    const [zeljeno, setZeljeno] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [prvi, setPrvi] = useState(false)

    useEffect(() => {
        const get = async () => {

            // GetData("http://localhost:8800/api/korisnik/vidiNapredak/" + k.idkorisnika, setNizNapredaka, setGreska, setIsLoading)
            // console.log(nizNapredaka)
            try {
                let res = await axiosPrivate.get("http://localhost:8800/api/napredak/vidiNapredak/" + user.trenerId + '/' + k.idkorisnika)

                setNizNapredak(res.data)
                setZeljeno(res.data.tezina)
                 console.log(res.data)
                // console.log(k)

                

            }
            catch (error) {
                
                if (error.response?.status !== 404) 
                {
                    setGreska('Doslo je do greske prilikom ucitavanja')
                }else{
                    setPrvi(true)
                }
            }

        }
        get()
    }, [])

    return (
        <Box className='marginS'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
                        <CardContent sx={{ flexGrow: '1' }}>
                            <Typography className='cardCenter' component="div" variant="h4" sx={{ height: '35%', textTransform: 'capitalize' }}>
                                {k.imeK} {k.prezimeK}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                E-mail: {k.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Broj telefona: {k.brojtelefonaK}
                            </Typography>
                            <Typography variant="body2">
                                Zeljeni parametri:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Zeljena tezina: {k.zeljenaTezina}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Zeljena tezina misica: {k.zeljenaTezinaMisica}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Zeljeni procenat masti: {k.zeljeniProcenatMasti}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Zeljeni procenat proteina: {k.zeljeniProcenatProteina}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            {!nizNapredaka && <Button sx={{ marginTop: '2%' }} fullWidth variant="contained" size="small" onClick={() => { setPrvi(true); setNapredak(true) }}>Novi napredak</Button>}
                            {nizNapredaka && <Button sx={{ marginTop: '2%' }} fullWidth variant="contained" size="small" onClick={() => { setPrvi(false); setNapredak(true) }}>Dodaj napredak</Button>}
                        </CardActions>
                        {napredak && <Modal onClose={() => { setNapredak(false) }}>
                            <DodajNapredak prvi={prvi} napredakId={k.napredakId} idKorisnika={k.idkorisnika} onClose={() => { setNapredak(false) }} />
                        </Modal>
                        }
                    </Card>
                </Grid>
                <Grid item xs={12} md={9} sx={{ maxHeight: '75vh' }}>
                    <Box className='scroll'>
                        <NapredakGrafici napredak={nizNapredaka} zeljeno={zeljeno} user={k} />
                    </Box>
                </Grid>
            </Grid>
        </Box>

    )
}

export default KorisnikVeliko