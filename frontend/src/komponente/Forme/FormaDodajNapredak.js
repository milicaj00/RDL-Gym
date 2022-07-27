import React, { useContext, useState, useRef, Fragment } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import { TextField, Typography } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel, Box } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Checkbox } from "@mui/material";
import Greska from '../Alert'
import { PostMetoda, PutMetoda } from '../Fetch'
import useAxiosPrivate from "../../api/useAxiosPrivate";


const Info = ({ labela, tip, reff }) => {
    return (
        <Fragment>
            <TextField
                inputRef={reff}
                defaultValue={0}
                label={labela}
                type={tip}
                size="small"
                placeholder={labela}
                />
        </Fragment>
    )
}

const DodajNapredak = (props) => {

    console.log(props)

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    const bodyAge = useRef()
    const procenatVode = useRef()
    const kostanaMasa = useRef()
    const BMI = useRef()
    const procenatMasti = useRef()
    const procenatProteina = useRef()
    const tezinaMisica = useRef()
    const tezina = useRef()


    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState('')

    const dodajNapredak = async () => {

        const zahtev = {
            url: `http://localhost:8800/api/napredak/dodajNapredak/${user.trenerId}/${props.idKorisnika}`,
            body: {
                // korisnikId: props.idKorisnika,
                tezina: tezina.current.value,
                tezinaMisica: tezinaMisica.current.value,
                procenatProteina: procenatProteina.current.value,
                procenatMasti: procenatMasti.current.value,
                BMI: BMI.current.value,
                kostanaMasa: kostanaMasa.current.value,
                procenatVode: procenatVode.current.value,
                bodyAge: bodyAge.current.value
            }
        }

        //await PostMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.post(zahtev.url, zahtev.body)
            alert('Uspesno dodat napredak')
            window.location.reload()
        } catch (err) {
            alert('Doslo je do greske')
        }

        // if (greska !== false) {
        //     alert('doslo je do greske')

        // }
        // else {
        //     alert('uspesno dodat napredak')
        // }

        props.onClose()


    }

    const izmeniNapredak = async () => {

        const zahtev = {
            url: `http://localhost:8800/api/napredak/izmeniNapredak/${props.napredakId}`,
            body: {
                // korisnikId: props.idKorisnika,
                tezina: tezina.current.value,
                tezinaMisica: tezinaMisica.current.value,
                procenatProteina: procenatProteina.current.value,
                procenatMasti: procenatMasti.current.value,
                BMI: BMI.current.value,
                kostanaMasa: kostanaMasa.current.value,
                procenatVode: procenatVode.current.value,
                bodyAge: bodyAge.current.value
            }
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
            alert('Uspesno dodat napredak')
            window.location.reload()
        } catch (err) {
            alert('Doslo je do greske')
        }


        // if (greska !== false) {
        //     alert('doslo je do greske')

        // }
        // else {
        //     alert('uspesno dodat napredak')
        // }

        props.onClose()

        window.location.reload(false)
    }


    return (


        <Box className="cardCenter" sx = {{gap: '1vh', padding: {sm:'0% 20%'}, margin: {xs: '5%', sm: '1%'}, alignItems: "stretch"}}>

            <Typography variant="h5" component="div"  gutterBottom sx={{ textAlign: 'center' }}>Napredak:</Typography>

            <Info labela='bodyAge' tip='number' reff={bodyAge} />
            <Info labela='procenatVode' tip='number' reff={procenatVode} />
            <Info labela='kostanaMasa' tip='number' reff={kostanaMasa} />
            <Info labela='BMI' tip='number' reff={BMI} />
            <Info labela='procenatMasti' tip='number' reff={procenatMasti} />
            <Info labela='procenatProteina' tip='number' reff={procenatProteina} />
            <Info labela='tezinaMisica' tip='number' reff={tezinaMisica} />
            <Info labela='tezina' tip='number' reff={tezina} />


            <Box sx = {{mt:'5%'}}>
            {!props.napredakId && <Button fullWidth size='small' variant="outlined" className="btn" onClick={dodajNapredak}>Unesi</Button>}
            {props.napredakId && <Button fullWidth size='small' variant="outlined" className="btn" onClick={izmeniNapredak}>Unesi</Button>}
            </Box>
        </Box>


    )
}
export default DodajNapredak