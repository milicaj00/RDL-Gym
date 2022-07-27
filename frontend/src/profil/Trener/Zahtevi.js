import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CircularProgress, Grid, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormaPosaljiPredlog from "../../komponente/Forme/FormaPosaljiPredlog";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const ZahteviTrenera = () => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [zahtevi, setZahtevi] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [evidencija, setEvidencija] = useState({ intenziteti: [], tipTreninga: [], datumi: [] })
    const [predlog, setPredlog] = useState(-1)


    // Accordion
    const [current, setCurrent] = useState(-1);

    const changeState = (i) => {
        current === i ? setCurrent(-1) : setCurrent(i)
    };


    useEffect(() => {

        // GetData("http://localhost:8800/api/treninge/vratiTreningePersonalniC/" + user.trenerId,
        //     setZahtevi, setGreska, setIsLoading)

        const get = async () => {
            setIsLoading(true)
            try {
                const res = await axiosPrivate.get("http://localhost:8800/api/trening/vratiTreningePersonalniC/" + user.trenerId)
                if (res.data) {
                    setZahtevi(res.data)
                }
                console.log(res.data)
                setIsLoading(false)
            }
            catch (err) {
                setIsLoading(false)
                console.error(err)
            }
        }

        get()

    }, [refresh])


    const potvrdiZahtev = async (id) => {
        const zahtev = {
            url: 'http://localhost:8800/api/trening/prihvatiTrening/' + id
        }

        try {
            await axiosPrivate.put('http://localhost:8800/api/trening/prihvatiTrening/' + id)

        } catch (err) {
            alert('Doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const odbijZahtev = async (id) => {

        const zahtev = {
            url: 'http://localhost:8800/api/trener/odbijTrening/' + id
        }


        try {
            await axiosPrivate.put('http://localhost:8800/api/trening/odbijTrening/' + id)

        } catch (err) {
            alert('Doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const vidiEvidenciju = async (id) => {
        // console.log(id)

        await axiosPrivate.get("http://localhost:8800/api/evidencija/vidiEvidenciju/" + user.trenerId + '/' + id)
            .then(res => {
                if (res.status === 200) {

                    if (res.data) {
                        // console.log(res.data)
                        // setEvidencija(res.data)
                        const intenziteti = res.data.intenziteti.slice(-5)
                        const datumi = res.data.datumi.slice(-5)
                        const tip = res.data.tipTreninga.slice(-5)

                        setEvidencija({ intenziteti: intenziteti, tipTreninga: tip, datumi: datumi })

                    }
                }
            }).catch((error) => {
                if (error.response?.status !== 404)
                    alert('Doslo je do greske')
                console.log(error)
            });
    }


    return (

        <Box className='marginS'>

            <Typography gutterBottom component="div" variant="h4" textAlign="center">Zahtevi</Typography>
            {isLoading && <Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>}

            {
                zahtevi.map((z, i) => (
                    <Box key={i} display='flex' flexDirection='row'>
                        <Accordion
                            sx={{ flexGrow: 1, marginBottom: '1%' }}
                            expanded={current === i}
                            onClick={() => { changeState(i); vidiEvidenciju(z.idKorisnika) }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >

                                <Typography variant="h6" sx={{ flexGrow: 1 }} >
                                    {z.datum}  {z.vreme}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ marginRight: '2%', textTransform: 'capitalize' }}>
                                    {z.imeT} {z.prezimeT}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', }}>
                                        <Typography>Broj telefona: {z.brojtelefonaT}</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>Intenzitet: {z.intenzitet}</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>Tip: {z.tip}</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>Online: {z.isOnline.toString()}</Typography>

                                    </Grid>

                                    <Grid item xs={12} md={10}>
                                        <Box textAlign='center'>
                                            <Typography mb={1} textAlign='center' fontWeight='500'> EVIDENCIJA PROTEKLIH TRENINGA</Typography>
                                            <Grid container spacing={2} justifyContent='center' mb={1}>
                                                {
                                                    evidencija?.intenziteti?.map((e, i) => (
                                                        <Grid item xs={12} md={2} key={i}>
                                                            <Card className='cardShadow' sx={{ padding: '1vh', textAlign: 'justify' }}>
                                                                <Typography>Datum: {evidencija.datumi[i]}</Typography>
                                                                <Typography>Tip: {evidencija.tipTreninga[i]}</Typography>
                                                                <Typography>Intenzitet: {e}</Typography>
                                                            </Card>
                                                        </Grid>
                                                    ))

                                                }
                                            </Grid>

                                            <Button variant="outlined" onClick={() => { setPredlog(i) }}>posalji izmenu</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </AccordionDetails>
                        </Accordion>

                        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '1% 0% 1% 1%' }}>
                            <IconButton
                                disableRipple={true}
                                sx={{ p: 0, color: 'green' }}
                                onClick={() => potvrdiZahtev(z.idZahteva)}
                            >
                                <CheckCircleIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                            <IconButton
                                disableRipple={true}
                                sx={{ p: 0, color: 'red' }}
                                onClick={() => odbijZahtev(z.idZahteva)}
                            >
                                <DeleteIcon sx={{ fontSize: "1.5em" }} />
                            </IconButton>
                        </Box>

                        {
                            predlog === i &&
                            <FormaPosaljiPredlog onClose={() => { setPredlog(-1); setRefresh(!refresh) }} idKorisnika={z.idKorisnika} idTreninga={z.idTreninga} idZahteva={z.idZahteva} />
                        }

                    </Box>
                ))
            }

        </Box>)
}
export default ZahteviTrenera