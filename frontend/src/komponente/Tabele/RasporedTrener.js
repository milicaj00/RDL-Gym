import { useState, Fragment, useEffect } from 'react'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useAxiosPrivate from '../../api/useAxiosPrivate'
import CircularProgress from '@mui/material/CircularProgress';


const RasporedTrener = (props) => {

    console.log(props)

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const [termini, setTermini] = useState([])
    const [greska, setGreska] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [data, setData] = useState(false)
    const [grupniTreninzi, setGrupniTreninzi] = useState([])
    const [treninzi, setTreninzi] = useState([])

    const [reload, setReload] = useState(false)


    useEffect(() => {

        const get = async () => {
            setTermini([])
            setGrupniTreninzi([])
            setTreninzi([])
            try {

                if (props.datum) {
                    let res = await axiosPrivate.get(`http://localhost:8800/api/termin/vratiZauzeteTermineZaTreneraPoDatumu/${props.idTrenera}/${props.datum}`)

                    if (res.data) {
                        setTermini(res.data)
                        console.log(res.data)
                    }
                    res = await axiosPrivate.get(`http://localhost:8800/api/trening/vratiTreningeGrupni/${props.idTrenera}/${props.datum}`)

                    if (res.data) {
                        setGrupniTreninzi(res.data)
                        console.log(res.data)
                    }
                }
                else {

                    setIsLoading(true)
                    const res = await axiosPrivate.get("http://localhost:8800/api/trening/vratiProsleTreninge/" + user.trenerId)
                    console.log(res.data)
                    if (res.data) {
                        setTreninzi(res.data)
                    }
                    setIsLoading(false)

                }
            }
            catch (err) {
                setIsLoading(false)

                if (err.response?.status !== 404) {
                    alert('Doslo je do greske')
                }
            }
        }
        get()
    }, [props.datum, reload])

    const unesiEvidenciju = async (treningId, korisnikId) => {

        const zahtev = {
            url: 'http://localhost:8800/api/evidencija/izmeniEvidenciju/' + user.trenerId + '/' + treningId,
            body: {
                korisnikId: korisnikId
            }
        }

        // PutMetoda(zahtev, setData, setGreska, setIsLoading)
        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
        } catch (err) {
            alert('Doslo je do greske')
        }

        setReload(!reload)
    }

    const obrisiTrening = async (treningId) => {

        try {
            await axiosPrivate.delete('http://localhost:8800/api/trening/obrisiTrening/' + treningId)
        } catch (err) {
            alert('Doslo je do greske')
        }

        setReload(!reload)

    }

    const Tabela = ({ row, niz, grupni, rowNames }) => {
        console.log(row)
        return (
            <TableContainer component={Paper} >
                <Table
                    size="small" >
                    <TableHead>
                        <TableRow>
                            {/* {props.treninzi && <TableCell align="right">Datum</TableCell>} */}

                            {row?.map((r, i) => (
                                <TableCell key={i} align="right">{r}</TableCell>
                            ))}
                            {!grupni &&
                                <TableCell></TableCell>
                            }
                            {!grupni &&
                                <TableCell></TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            niz?.map((el, i) => (
                                <TableRow key={i}>
                                    {rowNames?.map((r, i) => (
                                        <TableCell key={i} align="right">{el[r]}</TableCell>
                                    ))}

                                    {!grupni &&
                                        <TableCell align="right">
                                            {el.tip && <IconButton sx={{ p: 0, color: 'green' }} onClick={() => unesiEvidenciju(el.treningId, el.korisnikId)}>
                                                <CheckCircleIcon sx={{ fontSize: "1em" }} />
                                            </IconButton>}
                                            <IconButton sx={{ p: 0, color: 'red' }} onClick={() => obrisiTrening(el.treningId)} >
                                                <CancelIcon sx={{ fontSize: "1em" }} />
                                            </IconButton>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))
                        }

                    </TableBody>
                </Table>
            </TableContainer >
        )
    }

    const rowPersonalni = ['Vreme', 'Trajanje', 'Intenzitet', 'Tip', 'Klijent',]
    const rowGrupni = ['Vreme', 'Trajanje', 'Intenzitet', 'Mesta']
    const rowNamesGrupni = ['vreme', 'trajanje', 'intenzitet', 'brojslobodnih']
    const rowNamesPersonalni = ['vreme', 'trajanje', 'intenzitet', 'tip', 'imeK', 'prezimeK']
    const rowOdbijeni = ['Trening', 'Datum','Vreme', 'Trajanje', 'Intenzitet', 'Tip', 'Klijent']
    const rowNamesOdbijeni = ['nazivTreninga', 'datum', 'vreme', 'trajanje', 'intenzitet', 'tip', 'imeK', 'prezimeK']

    if (loading) {
        return (<Box className='cardCenter' ><CircularProgress size='2rem' /> </Box>)
    }

    return (
        <Fragment>
            {props.datum ?
                <Fragment>
                    <Typography sx = {{margin: '2%'}} variant='h5' >Personalni treninzi</Typography>

                    {termini.length !== 0 ?
                        <Tabela row={rowPersonalni} niz={termini} grupni={false} rowNames={rowNamesPersonalni} />
                        :
                        <Typography color='error'>Nemate zakazanih personalnih treninga za danas</Typography>
                    }

                    <Typography sx = {{margin: '2%'}} variant='h5'>Grupni treninzi</Typography>

                    {grupniTreninzi.length !== 0 ?

                        <Tabela row={rowGrupni} niz={grupniTreninzi} grupni={true} rowNames={rowNamesGrupni} />
                        :
                        <Typography color='error'>Nemate zakazanih grupnih treninga za danas</Typography>
                    }
                </Fragment>
                :
                <Fragment>
                    {treninzi.length !== 0 ?

                        <Tabela row={rowOdbijeni} niz={treninzi} grupni={false} rowNames={rowNamesOdbijeni} />
                        :
                        <Typography color='error'>Nemate stare treninge!</Typography>
                    }
                </Fragment>
            }
        </Fragment>
    )

}

export default RasporedTrener