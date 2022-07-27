import { useState, useEffect, useRef, Fragment } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField, Box, Paper, Input, TableHead } from '@mui/material';
import '../../styles/input.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Modal from '../../komponente/Modal';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import FormaDodajUslugu from '../../komponente/Forme/FormaDodajUslugu';

const TabelaUsluge = () => {

    const axiosPrivate = useAxiosPrivate()

    const [nizUsluga, setUsluge] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [izmeni, setIzmena] = useState(-1)
    const [data, setData] = useState('')

    //ovo je za izmenu
    const [cena, setCena] = useState(-1)
    const [opis, setOpis] = useState('')
    const [trajanje, setTrajanje] = useState(-1)

    const [refresh, setRefresh] = useState(false)
    const [novaUsluga, setNovaUsluga] = useState(false)

    let grupniTrening = false
    //ovo je za unos
    const opisUsluge = useRef()
    const cenaUsluge = useRef()
    const nazivUsluge = useRef()
    const trajanjeUsluge = useRef()

    useEffect(() => {

        //  GetData("http://localhost:8800/api/usluga/vidiUsluge", setUsluge, setGreska, setIsLoading)

        const get = async () => {
            setIsLoading(true)
            try {
                const res = await axiosPrivate.get("http://localhost:8800/api/usluga/vidiUsluge")
                if (res.data) {
                    setUsluge(res.data)
                }
                setIsLoading(false)

            } catch (err) {
                setIsLoading(false)
                alert('Doslo je do greske')
            }
        }
        get()
    }, [refresh])

    const izmeniUslugu = async (idUsluge) => {
        const zahtev = {
            url: 'http://localhost:8800/api/usluga/izmeniUslugu/' + idUsluge,
            body: {
                cena: cena,
                opis: opis,
                trajanje: trajanje
            }
        }

        // PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        setCena(-1)
        setIzmena(-1)
        setTrajanje(-1)
        // window.location.reload(false);
        setRefresh(!refresh)
    }

    const obrisiUslugu = async (idUsluge, opis) => {

        // console.log(opis)
        // console.log(idUsluge)

        const zahtev = {
            url: 'http://localhost:8800/api/usluga/obrisiUslugu/' + idUsluge
        }

        // console.log('http://localhost:8800/api/uprava/obrisiUslugu/' + idUsluge)
        //   DeleteMetoda(zahtev, setGreska, setIsLoading)
        try {
            await axiosPrivate.delete(zahtev.url)

        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')
        // }
        setCena(-1)
        setIzmena(-1)
        setRefresh(!refresh)
    }

    return (
        <Box>

            {isLoading && <CircularProgress size='2rem' disableShrink />}

            {greska && <p className='greska'>Doslo je do greske prilikom ucitavanje</p>}


            {novaUsluga
                &&
                <Modal onClose={() => setNovaUsluga(false)}>
                    <FormaDodajUslugu onClose={() => { setNovaUsluga(false); setRefresh(!refresh) }} />
                </Modal>
            }

            <Button
                size="medium"
                variant="outlined"
                onClick={() => setNovaUsluga(true)}
            >  dodaj novu uslugu
            </Button>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                                <TableRow>
                                    <TableCell sx={{ 'textAlign': 'left' }}> Naziv </TableCell>
                                    <TableCell sx={{ 'textAlign': 'left' }}>
                                        Cena
                                    </TableCell>

                                    <TableCell sx={{ 'textAlign': 'left' }}>
                                        Trajanje
                                    </TableCell>    
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {nizUsluga.map((usl, i) => (

                                <Fragment key={usl._id}>
                                    <TableRow key={usl._id}>

                                        <TableCell >{usl.naziv}</TableCell>

                                        <TableCell  >
                                            <input
                                                className='inputCSS'
                                                style ={{color: 'primary.textContrast'}}
                                                type='number'
                                                step={10}
                                                value={izmeni === i ? (cena === 0 ? usl.cena : cena) : usl.cena}
                                                disabled={izmeni !== i}
                                                onChange={(ev) => setCena(ev.target.value)} />
                                        </TableCell>

                                        <TableCell>
                                            <input
                                                className='inputCSS'
                                                type='number'

                                                value={izmeni === i ? (trajanje === 0 ? usl.trajanje : trajanje) : usl.trajanje}
                                                disabled={izmeni !== i}
                                                onChange={(ev) => setTrajanje(ev.target.value)} />
                                        </TableCell>


                                        {izmeni !== i &&
                                            <TableCell>
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setCena(usl.cena);
                                                        setOpis(usl.opis)
                                                        setTrajanje(usl.trajanje)
                                                        setIzmena(i);
                                                    }}
                                                // disabled={izmeni === i}
                                                > Izmeni
                                                </Button>
                                            </TableCell>
                                        }
                                        <TableCell>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                color="error"
                                                onClick={() => obrisiUslugu(usl._id, usl.opis)}
                                                startIcon={<DeleteIcon />}
                                            >
                                                Obrisi
                                            </Button>
                                        </TableCell>
                                        {/* </div> */}
                                    </TableRow>

                                    {izmeni === i && <TableRow style={{ alignItems: 'center' }}>

                                        <TableCell>
                                            <TextField
                                                sx={{ m: 1, width: 400, alignSelf: 'center' }}
                                                label="opis"
                                                multiline
                                                rows={5}
                                                color="primary"
                                                inputRef={opisUsluge}
                                                // defaultValue={usl.opis}
                                                value={opis}
                                                onChange={(ev) => setOpis(ev.target.value)}
                                                variant="outlined"
                                                focused
                                            />

                                        </TableCell>
                                        <TableCell className='cardCenter'>
                                            <Button
                                                sx={{ mb: 1 }}
                                                fullWidth
                                                color='success'
                                                size="small"
                                                variant="contained"
                                                onClick={() => { izmeniUslugu(usl._id) }}
                                            // disabled={izmeni !== i}
                                            > Ok
                                            </Button>
                                            <Button
                                                fullWidth
                                                color='error'
                                                size="small"
                                                variant="contained"
                                                onClick={() => { setCena(usl.cena); setIzmena(-1); setOpis(usl.opis); setTrajanje(usl.trajanje) }}
                                            // disabled={izmeni !== i}
                                            > Otkazi
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>

                                    </TableRow>}
                                </Fragment>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )

}
export default TabelaUsluge