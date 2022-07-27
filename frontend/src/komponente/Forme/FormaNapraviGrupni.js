import React, { useContext, useState, useRef, useEffect } from "react";
import '../../styles/formaZakazi.css'
import '../../styles/stil.css'
import Button from "@mui/material/Button";
import { Box, Grid, TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Greska from '../Alert'
import hrLocale from 'date-fns/locale/hr'
import useAxiosPrivate from '../../api/useAxiosPrivate'
import DropDown from "../Inputi/DropDown";

const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]


const NapraviGrupni = (props) => {

    const axiosPrivate = useAxiosPrivate()

    let isOnline = false

    const [intenzitetTreninga, setIntenzitet] = useState(intenzitet[0])
    const [trajanjeTreninga, setTrajanje] = useState(trajanje[0])

    const [error, setError] = useState(false)
    const maxBrojClanova = useRef()
    const naziv = useRef()
    const [treninzi, setTreninzi] = useState([])
    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(new Date(0, 0, 0, 8));
    const [usluga, setUsluga] = useState('');


    useEffect(() => {
        // GetData("http://localhost:8800/api/trening/vidiGrupneUsluge", setTreninzi, setGreska, setIsLoading) 
        const get = async () => {
            await axiosPrivate.get("http://localhost:8800/api/trening/vidiGrupneUsluge")
                .then(res => {
                    if (res.status === 200) {

                        if (res.data) {
                            setTreninzi(res.data)
                        }
                        else {
                            setTreninzi([])
                        }
                    }
                }).catch((error) => {
                    alert('Doslo je do greske')
                    console.log(error)
                });
        }
        get()
    }, [])

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }


    const zakaziGrupniTrening = async () => {

        if (maxBrojClanova.current.value <= 0) {
            alert('morate uneti broj clanova')
            return
        }

        if (intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const datum = new Date(date.getFullYear(), date.getMonth(), date.getDate())

        const zahtev = {
            url: 'http://localhost:8800/api/trening/zakaziGrupniTrening/' + props.idTrenera + '/' + usluga,
            body: {
                naziv: naziv.current.value,
                datum: datum.toISOString(),
                vreme: vreme,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline,
                brojMaxClanova: maxBrojClanova.current.value,
                status: 'Odobreno'
            }
        }

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
            alert('Uspesno dodat trening')
        } catch (err) {
            alert('Doslo je do greske')
        }

        props.onClose()
    }

    let datumDo = new Date();
    datumDo.setDate((new Date()).getDate() + 14)

    return (
        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: { sm: '0% 20%' }, alignItems: "stretch" }}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Grupni trening</Typography>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    label="Izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    minDate={new Date()}
                    maxDate={datumDo}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={hrLocale}>

                <Stack spacing={3}>
                    <TimePicker
                        renderInput={(params) => <TextField size='small' {...params} />}
                        size='small'
                        value={vreme}
                        minutesStep={15}
                        label="Vreme treninga"
                        onChange={(newValue) => {
                            setVreme(newValue);
                        }}
                        minTime={new Date(0, 0, 0, 8)}
                        maxTime={new Date(0, 0, 0, 18, 45)}
                    />

                </Stack>
            </LocalizationProvider>


            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown className='marginForm' labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <Box className="cardCenter" sx={{ gap: '1vh' }} >

                <TextField
                    sx={{ width: '100%' }}
                    inputRef={naziv}
                    label='Naziv'
                    type='text'
                    size="small"
                    placeholder='naziv'
                />

                <TextField
                    sx={{ width: '100%' }}
                    inputRef={maxBrojClanova}
                    label='Max broj clanova'
                    type='number'
                    size="small"
                    placeholder='max broj clanova'
                />

                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>Usluga</InputLabel>
                    <Select
                        label='Usluga'
                        value={usluga}
                        size='small'
                        onChange={(ev) => {
                            setUsluga(ev.target.value);
                            console.log(ev.target)
                        }}
                    >
                        {
                            treninzi.map(n => (
                                <MenuItem key={n._id} name={n._id} value={n._id}>{n.naziv}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </Box>

            <Box sx = {{mt:'5%'}}>
                <Button fullWidth size='small' variant="outlined" onClick={zakaziGrupniTrening}>Potvrdi</Button>
            </Box>

        </Box>
    )
}

export default NapraviGrupni