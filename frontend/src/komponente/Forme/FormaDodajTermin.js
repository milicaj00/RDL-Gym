import React, { useState } from "react";
import '../../styles/formaZakazi.css'
import '../../styles/stil.css'
import Button from "@mui/material/Button";
import { Box, TextField, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru'
import useAxiosPrivate from "../../api/useAxiosPrivate";

const FormaDodajTermin = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const [date, setDate] = useState(new Date());
    const [vreme, setVreme] = useState(
        [
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
            new Date(0, 0, 0, 8),
        ]);

    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')

    let niz = [0, 1, 2, 3, 4]

    const promeniVreme = (newValue, i) => {
        let noviNiz = [...vreme];
        noviNiz[i] = newValue
        setVreme(noviNiz);
    }

    const unesiTermin = async () => {
        console.log(vreme)
        let uniqueArray = vreme.map(function (date) { return date.getTime() })
            .filter(function (date, i, array) {
                // console.log(array.indexOf(date))
                //  console.log(array)
                //  console.log(date)
                return array.indexOf(date) === i;
            })
            .map(function (time) { return new Date(time); });


        // if (uniqueArray.length <= 4) {
        //     alert('morate uneti razlicita vremena')
        //     return
        // }

        uniqueArray.forEach(async i => {
            console.log(i)
            console.log(uniqueArray)

            const zahtev = {
                url: 'http://localhost:8800/api/termin/dodajTerminTreneru/' + props.idTrenera,
                body: {
                    datum: new Date(date.toDateString()).toISOString(),
                    vremePocetka: i.toISOString(),
                }
            }
            // await PostMetoda(zahtev, setData, setGreska, setIsLoading)

            // console.log(greska)
            try {
                await axiosPrivate.post(zahtev.url, zahtev.body)
            } catch (err) {
                alert('Doslo je do greske')
            }
        })

        props.onClose()
    }

    return (
        <Box className="cardCenter marginS" sx={{ gap: '1vh', padding: { sm: '0% 20%' }, alignItems: "stretch" }}>

            <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center' }}>Termini</Typography>

            <LocalizationProvider dateAdapter={AdapterDateFns}>

                <DatePicker
                    sx={{ width: '100%' }}
                    label="izaberite datum"
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                    minDate={new Date()}
                    renderInput={(params) => <TextField size='small' {...params} />}
                    focused
                />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}
                adapterLocale={ruLocale}>
                {
                    niz.map((i) => (
                        <TimePicker
                            key={i}
                            renderInput={(params) => <TextField size='small' {...params} />}
                            size='small'
                            value={vreme[i]}
                            minutesStep={15}
                            label="pocetak termina"
                            onChange={(newValue) => {
                                promeniVreme(newValue, i)
                            }}
                            minTime={new Date(0, 0, 0, 8)}
                            maxTime={new Date(0, 0, 0, 18, 45)}
                        />
                    ))
                }

            </LocalizationProvider>

            <Button sx={{ mt: '5%' }} fullWidth size='small' variant='outlined' onClick={unesiTermin}>unesi</Button>
        </Box>
    )
}

export default FormaDodajTermin