import React, { useContext, useState,} from "react";
import '../../styles/formaZakazi.css'
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import { FormControlLabel, Box, Typography } from '@mui/material';
import { Checkbox } from "@mui/material";
import Greska from '../Alert'
import useAxiosPrivate from "../../api/useAxiosPrivate";
import DropDown from '../Inputi/DropDown'

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]

const FormaIzmeniTrening = (props) => {
    // console.log(props.idTreninga)

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);

    let isOnline = props.isOnline
    const [tipTreninga, setTip] = useState(props.tipTreninga)
    const [intenzitetTreninga, setIntenzitet] = useState(props.intenzitetTreninga)
    const [trajanjeTreninga, setTrajanje] = useState(props.trajanjeTreninga)
    const [error, setError] = useState(false)
  
    const izmeniTrening = async (ev) => {

        if (tipTreninga === '' || intenzitetTreninga === '' || trajanjeTreninga === '') {
            setError('Morate uneti sve podatke')
            return
        }

        const zahtev = {
            url: 'http://localhost:8800/api/trening/izmeniTrening/' + user.korisnikId + '/' + props.idTreninga,
            body: {
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga,
                isOnline: isOnline
            }
        }

        // await PutMetoda(zahtev, setData, setGreska, setIsLoading)

        try {
            await axiosPrivate.put(zahtev.url, zahtev.body)
            alert('Uspesno ste se izmenili trening')
        } catch (err) {
            alert('Doslo je do greske')
        }

        props.onClose()
    }

    const onlineTrening = (ev) => {
        isOnline = ev.target.checked
    }


    return (
        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding:{sm:'0% 20%' }, alignItems: "stretch", display: 'flex', flexDirection: 'column' }}>

            <Greska open={Boolean(error)} onClose={() => setError(false)} greska={error} />

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Izmenite trening</Typography>

            <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
            <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
            <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

            <Box className="cardCenter">
            <FormControlLabel
                value="online"
                onChange={onlineTrening}
                control={<Checkbox />}
                label="On-line trening"
                labelPlacement="start"
            />
            </Box>

            <Box className="cardCenter">
                <Button size='small' variant="outlined" onClick={izmeniTrening}>Potvrdi</Button>
            </Box>

        </Box>
    )
}

export default FormaIzmeniTrening