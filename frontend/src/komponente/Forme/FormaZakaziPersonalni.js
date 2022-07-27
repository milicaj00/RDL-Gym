import React, { useContext, useState, useRef, useEffect } from "react";
import '../../styles/stil.css'
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Greska from '../Alert'
import useAxiosPrivate from "../../api/useAxiosPrivate";
import DropDown from "../Inputi/DropDown";

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]

const FormaZakaziPersonalni = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    let isOnline = false

    const [tipTreninga, setTip] = useState(tip[0])
    const [intenzitetTreninga, setIntenzitet] = useState(intenzitet[0])
    const [trajanjeTreninga, setTrajanje] = useState(trajanje[0])
    const [error, setError] = useState(false)
    const [date, setDate] = useState(new Date());
    const [termin, setTermin] = useState({ vreme: "", idTermina: "" });
    const [termini, setTermini] = useState([1])

    useEffect(() => {

        setTermin({ vreme: "", idTermina: "" })
        setTermini([])

        const datum = new Date(date.toDateString())

        const get = async () => {
            await axiosPrivate.get(`http://localhost:8800/api/termin/vratiSlobodneTermineZaTreneraPoDatumu/${props.idTrenera}/${datum.toISOString()}`)
                .then(res => {
                    if (res.status === 200) {

                        if (res.data) {
                            setTermini(res.data)
                        }
                    }
                }).catch((error) => {
                    alert('Doslo je do greske')
                    console.log(error)
                });
        }
        get()

    }, [date])

    const zakaziTrening = async (ev) => {
        console.log(termin.vreme)


        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '' || termin.vreme === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const datum = (new Date(date.toDateString() + ' ' + termin.vreme.vreme))

        const zahtev = {
            url: 'http://localhost:8800/api/trening/zakaziPersonalniTrening/' + user.korisnikId + '/' + props.idTrenera + '/' + termin.vreme.idTermina,
            body: {
                // trenerId: props.idTrenera,
                datum: datum,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
            alert('Uspesno ste zakazali trening')
        } catch (err) {
            console.log(err.response)
            if (err.response.status === 405) {
                alert(err.response.data)
            }
            else alert('Doslo je do greske')
        }

         props.onClose()
    }



    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: {sm:'0% 20%' } , alignItems: "stretch" }} onSubmit={zakaziTrening}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Personalni trening</Typography>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    label="Izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                        //   nadjiTermin(newValue);
                    }}
                    minDate={new Date()}
                    maxDate={datumDo}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>


            <FormControl sx={{ width: '100%' }}
                disabled={termini.length === 0}
            >
                <InputLabel size ='small'>{termini.length === 0 ? 'Nema slobodnih termina' : 'Vreme'}</InputLabel>
                <Select
                    label='vreme'
                    value={termin.vreme}
                    size='small'
                    onChange={(ev) => {
                        setTermin({ vreme: ev.target.value })
                        //   console.log(ev.target.value)
                    }}
                >
                    {
                        termini.map((n, i) => (
                            <MenuItem key={i} value={n}>{n.vreme}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>

            <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown className='marginForm' labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <Box sx = {{mt:'5%'}}>
                <Button  fullWidth size='small' variant="outlined" onClick={zakaziTrening}>Potvrdi</Button>
            </Box>

        </Box>
    )
}

export default FormaZakaziPersonalni