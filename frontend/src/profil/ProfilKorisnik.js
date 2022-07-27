import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { UserContext } from '../context/UserContext'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography, Grid, CardActions, CardContent, Badge, Tooltip } from "@mui/material";
import IzmeniLozinku from "../komponente/Inputi/IzmeniLozinku";
import useAxiosPrivate from "../api/useAxiosPrivate";
import Info from "../komponente/Inputi/Info";

const Korisnik = (props) => {

    const axiosPrivate = useAxiosPrivate();

    const { user, dispatch } = useContext(UserContext);
    const [izmena, setIzmena] = useState(true)
    const [izmeniPodatke, setIzmeniPodatke] = useState(true)
    
    const [clanarina, setClanarina] = useState({ datumDo: '', cena: '' })

    const [greska, setGreska] = useState(false)

    const [novaLozinka, setNova] = useState(false)
    const pass = useRef('')
    const [isLoading, setIsLoading] = useState(false)
    const [poslednji, setPoslednji] = useState()

    const [korisnik, setKorisnik] = useState({
        visina: user.visina,
        brojGodina: user.brojGodina,
        zeljenaTezina: user.zeljenaTezina,
        zeljenaTezinaMisica: user.zeljenaTezinaMisica,
        zeljeniProcenatMasti: user.zeljeniProcenatMasti,
        zeljeniProcenatProteina: user.zeljeniProcenatProteina
    })

    const zelje = ['Zeljena tezina', 'Zeljena tezina misica', 'Zeljeni procenat masti' ,'Zeljeni procenat proteina', ]
    const zeljeKodKorisnika = ['zeljenaTezina', 'zeljenaTezinaMisica', 'zeljeniProcenatMasti' ,'zeljeniProcenatProteina', ]
    const tooltips = ['Optimalna vrednost visina(cm)-100', 'Optimalna vrednost 75-89% tezine', 'Optimalna vrednost 8-10%', 'Optimalna vrednost 16-20% tezine' ]

    useEffect(() => {
        const get = async () => {
            try {
                setIsLoading(true)
                const res = await axiosPrivate.get("http://localhost:8800/api/clanarina/vidiClanarinu/" + user.korisnikId)
                setClanarina(res.data)
                const res1 = await axiosPrivate.get("http://localhost:8800/api/napredak/vidiNapredakPoslednji/" + user.korisnikId)
                setPoslednji(res1.data)
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
                if (!error?.response) {
                    setGreska('No Server Response')
                } else {
                    setGreska('Doslo je do greske prilikom ucitavanja')
                }
            }
        }

        get()
    }, [])

    const otkaziIzmenu = () => {
        setIzmena(true)
        setNova(false)
    }

    const [data, setData] = useState('')

    const izmeniKorisnika = async () => {

        if (korisnik.visina === '' || korisnik.visina < 0
            || korisnik.brojGodina === '' || korisnik.brojGodina < 0
            || korisnik.zeljeniProcenatProteina === '' || korisnik.zeljeniProcenatProteina < 0
            || korisnik.zeljenaTezinaMisica === '' || korisnik.zeljenaTezinaMisica < 0
            || korisnik.zeljeniProcenatMasti === '' || korisnik.zeljeniProcenatMasti < 0
            || korisnik.zeljenaTezina === '' || korisnik.zeljenaTezina < 0
        ) {
            alert('Molimo unesite ispravne podatke')
            //console.log(korisnik)
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/izmeniParametre/' + user.korisnikId,
            body: {
                visina: korisnik.visina,
                brojGodina: korisnik.brojGodina,
                zeljeniProcenatProteina: korisnik.zeljeniProcenatProteina,
                zeljenaTezinaMisica: korisnik.zeljenaTezinaMisica,
                zeljeniProcenatMasti: korisnik.zeljeniProcenatMasti,
                zeljenaTezina: korisnik.zeljenaTezina
            }
        }

        setGreska(false)
        // PutMetoda(zahtev, setData, setGreska, setIsLoading)
        // console.log(greska)

        try {
            const res = await axiosPrivate.put(zahtev.url, zahtev.body)
            if (res.status === 200) {
                dispatch({ tip: "UPDATE_USER", payload: { ...user, ...korisnik } })
            }
        }
        catch (err) {
            alert('Doslo je do greske')
            setKorisnik({
                visina: user.visina,
                brojGodina: user.brojGodina,
                zeljenaTezina: user.zeljenaTezina,
                zeljenaTezinaMisica: user.zeljenaTezinaMisica,
                zeljeniProcenatMasti: user.zeljeniProcenatMasti,
                zeljeniProcenatProteina: user.zeljeniProcenatProteina
            })
        }



        setIzmeniPodatke(true)
    }

    let navigate = useNavigate()

    return (
        <Box className = 'marginS'>

            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {!user.verifikovan
            &&
            <Typography component = 'div' textAlign = 'center' mb = {1} variant="h6" color = 'error' >Imate pravo na jedan probni trening!</Typography>
            }

            {/* <Typography display='flex' mb={5} justifyContent="center" variant="h4" >{user.ime} {user.prezime}</Typography> */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: '1', marginBottom: '5%' }}>
                            {!user && <p>nema korisnika</p>}

                            <Typography className='cardCenter' component="div" variant="h4" sx={{ height: '35%', textTransform: 'capitalize' }}>{user.ime} {user.prezime}</Typography>

                            <Typography mb={2}>Clanarina vazi do: {clanarina.vaziDo ? new Date(clanarina.vaziDo).toLocaleDateString() : ''}</Typography>

                            <Typography mb={2}>e-mail: {user.email}</Typography>

                            <Typography mb={2}>Broj telefona: {user.brojTelefona}</Typography>

                            <Box className = 'zelje'>
                                <Info
                                    labela = 'Godine'
                                    tip ='number'
                                    minvalue={0}
                                    maxvalue={100}
                                    value={korisnik.brojGodina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, brojGodina: ev.target.value }))} />
                            </Box>
                            <Box className = 'zelje'>

                                <Info
                                    labela = 'Visina'
                                    tip='number'
                                    minvalue={0}
                                    maxvalue={260}
                                    value={korisnik.visina}
                                    disabled={izmeniPodatke}
                                    onChange={(ev) => setKorisnik((k) => ({ ...k, visina: ev.target.value }))} />
                            </Box>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'center', alignItems: 'center' }}>
                            {izmena && <Button mb={2} variant="outlined" fullWidth onClick={() => { setIzmena(false) }}>Promeni lozinku</Button>}
                            {!izmena &&
                                <IzmeniLozinku onClose={() => { setIzmena(true) }} />
                            }
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: '1' }}>
                            <Typography gutterBottom variant="h6">Zeljene vrednosti</Typography>

                            {
                                zelje.map((z,i)=>(
                                 <Box className = 'zelje' key={i} >
                                
                                <Tooltip title={tooltips[i]} placement="right-start">
                                    <Badge badgeContent="?"color="primary">
                                    <Info
                                        labela = {z}
                                        tip='number'
                                        minvalue={0}
                                        maxvalue={200}
                                        focused
                                        value={korisnik[zeljeKodKorisnika[i]]}
                                        disabled={izmeniPodatke}
                                        onChange={(ev) => setKorisnik((k) => ({ ...k, [zeljeKodKorisnika[i]]: ev.target.value }))} />
                                    </Badge>
                                </Tooltip>    
                                  </Box>
                                ))
                            }

                        </CardContent>
                        <CardActions>
                            {!izmeniPodatke && <Button fullWidth color='success' variant="contained" size='small' onClick={izmeniKorisnika}>OK</Button>}
                            {!izmeniPodatke && <Button fullWidth color='error' variant="contained" size='small' onClick={() => {
                                setIzmeniPodatke(true); setKorisnik({
                                    visina: user.visina,
                                    zeljenaTezina: user.zeljenaTezina,
                                    zeljenaTezinaMisica: user.zeljenaTezinaMisica,
                                    zeljeniProcenatMasti: user.zeljeniProcenatMasti,
                                    zeljeniProcenatProteina: user.zeljeniProcenatProteina
                                })
                            }}>otkazi</Button>}

                            {izmeniPodatke && <Button variant="outlined" fullWidth onClick={() => { setIzmeniPodatke(false) }}>Izmeni podatke</Button>}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>

                        <Card variant="outlined" sx={{ height: '100%' }}>
                           
                            <CardContent>
                                             
                                <Typography variant="h6">Poslednje merenje</Typography>
                                {
                                    !poslednji &&
                                    <Typography color = 'error'>Nema podataka sa poslednjeg merenja</Typography>
                                }
                                { poslednji
                                &&
                                <Box>
                                <p>Tezina: {poslednji.tezina}</p>
                                <p>Procenat masti: {poslednji.procenatMasti}</p>
                                <p>Procenat proteina: {poslednji.procenatProteina}</p>
                                <p>Tezina misica: {poslednji.tezinaMisica}</p>
                                <p>Procenat vode: {poslednji.procenatVode}</p>
                                <p>Kostana masa: {poslednji.kostanaMasa}</p>
                                <p>BMI: {poslednji.BMI}</p>
                                <p>BodyAge: {poslednji.bodyAge}</p>
                                </Box>
                                }
                            </CardContent>
                            { poslednji
                            &&
                            <CardActions>                        
                                <Button href={"/napredak"} variant="outlined" fullWidth>Vidi napredak</Button>
                            </CardActions>
                            }
                        </Card>
                    
                </Grid>
            </Grid>
        </Box >
    )
}

export default Korisnik