import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UserContext } from '../../context/UserContext';
import { Card, CardMedia, CardContent, CardActionArea, CardAction, Typography, Grid, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../styles/stil.css'
import useAxiosPrivate from '../../api/useAxiosPrivate';



const KorisniciTrenera = () => {
    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [korisnici, setKorisnici] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const [data, setData] = useState('')


    useEffect(() => {
        const get = async () => {
            // GetData('http://localhost:8800/api/korisnik/vratiKorisnike/' + user.trenerId, setKorisnici, setGreska, setIsLoading)
            try {
                const res = await axiosPrivate.get('http://localhost:8800/api/korisnik/vratiKorisnike/' + user.trenerId)
                console.log(res)
                if (res.data)
                    setKorisnici(res.data)
            }
            catch (error) {
                if (!error?.response) {
                    setGreska('No Server Response')
                } else
                    if (error.response?.status !== 404) {
                        setGreska('Doslo je do greske prilikom ucitavanja')
                    }
            }
        }
        get()
    }, [refresh])

    const izbaciKlijenta = async (id) => {

        console.log(id)

        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/obrisiSvogKlijenta/' + user.trenerId,
            body: {
                korisnikId: id
            }
        }

        //await PutMetoda(zahtev, setData, setGreska, setIsLoading)
        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
        }
        catch (error) {
            alert('Doslo je do greske')
            console.error(error.response)
        }

        setRefresh(!refresh)

    }

    let navigate = useNavigate()

    return (
        <Box className='marginS'>
            <Grid container spacing={2}>
                {korisnici.map((k, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4} lg={3} sx={{ display: { xs: 'flex', sm: 'block' }, justifyContent: 'center' }} >
                        <Card variant="outlined" sx={{ maxWidth: 345, minWidth: 250 }}
                        >
                            <CardActionArea onClick={() => {
                                navigate(`/trener/korisnik/${k.imeK + k.prezimeK}`, { state: k });
                            }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx = {{ textTransform: 'capitalize'}}>
                                        {k.imeK} {k.prezimeK}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        E-mail: {k.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Broj telefona: {k.brojtelefonaK}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <Button onClick={() => { izbaciKlijenta(k.idkorisnika) }}>Ukloni klijenta</Button>
                            </CardActions>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )


}
export default KorisniciTrenera