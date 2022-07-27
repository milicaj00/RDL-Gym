import { useState, useRef, } from 'react'
import { Button, TextField, Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import '../../styles/input.css'
import useAxiosPrivate from '../../api/useAxiosPrivate';
import Info from '../Inputi/Info';


const FormaDodajUslugu = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const opisUsluge = useRef()
    const cenaUsluge = useRef()
    const nazivUsluge = useRef()
    const trajanjeUsluge = useRef()
    const slika = useRef()
    const [file, setFile] = useState('')

    // let grupniTrening = false

    const [grupniTrening, isGrupni] = useState(false)


    const dodajUslugu = async () => {

        if (nazivUsluge.current.value === '') {
            alert('morate uneti naziv')
            return
        }
        if (cenaUsluge.current.value === '' || cenaUsluge.current.value < 0) {
            alert('morate uneti cenu')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/usluga/dodajUslugu',
            body: {
                naziv: nazivUsluge.current.value,
                cena: cenaUsluge.current.value,
                opis: opisUsluge.current.value,
                trajanje: trajanjeUsluge.current.value,
                treningGrupni: grupniTrening,
                // slika: slika.current.value
            }
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('naziv', nazivUsluge.current.value);
        formData.append('opis', opisUsluge.current.value);
        formData.append('cena', cenaUsluge.current.value);
        formData.append('trajanje', trajanjeUsluge.current.value);
        formData.append('treningGrupni', grupniTrening);

        try {
            await axiosPrivate.post(zahtev.url, formData, zahtev.body)
            alert('Uspesno doadta usluga: ' + nazivUsluge.current.value)

        } catch (err) {
            alert('Doslo je do greske')
        }

        props.onClose()
    }

    return (
        <Box className="cardCenter marginS" sx={{ gap: '1vh', padding: { sm: '0% 20%' }, alignItems: "stretch" }}>

            <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center' }}>Usluga</Typography>

            <Info sx={{ width: '100%' }} labela='naziv' tip='text' tekst='naziv' reff={nazivUsluge} />

            <Info sx={{ width: '100%' }} labela='opis' tip='text' tekst='opis' reff={opisUsluge} multiline rows={4} />

            <Info sx={{ width: '100%' }} labela='Cena' tip='number' tekst='cena' reff={cenaUsluge} step='10' />

            <Info sx={{ width: '100%' }} labela='Trajanje' tip='number' tekst='Trajanje' reff={trajanjeUsluge} step='10' />

            <FormControlLabel
                sx={{ alignSelf: 'center' }}
                value="online"
                onChange={(ev) => { isGrupni(ev.target.checked) }}
                control={<Checkbox color="primary" />}
                label="Grupni trening"
                labelPlacement="start"
                color="primary"
            />

            {grupniTrening &&
                <Info sx={{ alignSelf: 'center', m: 1, }} fullWidth tip='file' onChange={(ev) => { setFile(ev.target.files[0]); }} />
            }

            <Button sx = {{mt:'5%'}} fullWidth size='small' variant="outlined" onClick={dodajUslugu}>Unesi</Button>

        </Box>
    )
}
export default FormaDodajUslugu