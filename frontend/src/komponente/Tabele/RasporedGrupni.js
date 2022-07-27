import { useState, Fragment, useEffect } from 'react'
import Modal from '../Modal'
import LogIn from '../../pocetna/LoginForma'
import Register from '../../pocetna/RegisterForma'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import useAxiosPrivate from '../../api/useAxiosPrivate'

const RasporedGrupni = (props) => {

    console.log(props)

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [termini, setTermini] = useState([])
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState(false)
    const [zakazi, setZakazi] = useState(false)
    const [login, setLogin] = useState(true)


    useEffect(() => {
        // GetData(`http://localhost:8800/api/trening/vidiGrupneTreninge/${props.idUsluge}/${props.datum}`, setTermini, setGreska, setIsLoading)
        setTermini([])
        const get = async () => {
            await axiosPrivate.get(`http://localhost:8800/api/trening/vidiGrupneTreninge/${props.idUsluge}/${props.datum}`)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data) {
                            setTermini(res.data)
                            console.log(res.data)
                        }
                    }
                }).catch((error) => {

                    if (error.response?.status !== 404) {
                        alert("Doslo je do greske!")
                    }
                });
        }
        get()

    }, [props.datum])

    const zakaziForma = async (treningId) => {
        console.log(treningId)

        if (!user) {
            setZakazi(!zakazi)
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/trening/prijavaGrupniTrening/' + user.korisnikId + '/' + treningId
        }

        //PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put('http://localhost:8800/api/trening/prijavaGrupniTrening/' + user.korisnikId + '/' + treningId)
            alert('Uspesno ste se prijavili za trening')
            window.location.reload(false)
        } catch (err) {

            if (err.response?.status === 400) {
                alert(err.response.data.toString())
            } else {
                alert(err.response.data.toString())
                console.log(err)
            }
        }

        // if (greska !== false) {
        //     alert(greska)
        // }
        // else {
        //     alert('uspesno ste se prijavili za trening')
        // }

    }


    return (
        <Fragment>
            {termini.length === 0 ? <Typography color='error'>Nema dostupnih treninga</Typography>
                :
                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 650 }} size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell>Trener</TableCell>
                                <TableCell align="right">Vreme</TableCell>
                                <TableCell align="right">Trajanje</TableCell>
                                <TableCell align="right">Intenzitet</TableCell>
                                <TableCell align="right">Mesta</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {termini.map((t, i) => (
                                <TableRow
                                    key={i}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {t.imeT} {t.prezimeT}
                                    </TableCell>
                                    <TableCell align="right"> {t.vreme}</TableCell>
                                    <TableCell align="right">{t.trajanje}</TableCell>
                                    <TableCell align="right">{t.intenzitet}</TableCell>

                                    <Fragment>
                                        <TableCell align="right"> {t.brojslobodnih}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                value={t.vreme + " " + t.trajanje}
                                                onClick={() => zakaziForma(t.treningID)}>Zakazi
                                            </Button>
                                        </TableCell>
                                    </Fragment>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            {
                zakazi && <Modal onClose={() => { setZakazi(false) }}>

                    {login && <Box><LogIn onClose={() => { setZakazi(false) }} />
                        <span>Nemate nalog:
                            <Button size='small' onClick={() => { setLogin(false) }}>Registruj se</Button>
                        </span>
                    </Box>}

                    {!login && <Box><Register onClose={() => { setZakazi(false) }} />
                        <span>Imate nalog:
                            <Button size='small' onClick={() => { setLogin(true) }}>Prijavi se</Button>
                        </span>
                    </Box>}

                </Modal>
            }
        </Fragment>
    )
}

export default RasporedGrupni