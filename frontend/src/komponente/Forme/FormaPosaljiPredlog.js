import React, { useContext, useState } from "react";
import { Box,Button, Typography } from '@mui/material';
import Modal from '../Modal';
import DropDown from "../Inputi/DropDown";
import useAxiosPrivate from "../../api/useAxiosPrivate";

const tip = ["Gornji deo tela", "Donji deo tela", "Kardio"]
const intenzitet = ["Lak", "Srednje tezak", "Tezak"]
const trajanje = ["30min", "45min", "1h"]

const FormaPosaljiPredlog = (props) => {
    console.log(props)

    const axiosPrivate = useAxiosPrivate()

    const [tipTreninga, setTip] = useState("")
    const [intenzitetTreninga, setIntenzitet] = useState("")
    const [trajanjeTreninga, setTrajanje] = useState("")

    const posaljiIzmenu = async () => {

        try {
            //napravi zahtev trening
            await axiosPrivate.post('http://localhost:8800/api/zahtev/napraviZahtevTrener', {
                idTreninga: props.idTreninga,
                idKorisnika: props.idKorisnika,
                idZahteva: props.idZahteva,
                tip: tipTreninga,
                intenzitet: intenzitetTreninga,
                trajanje: trajanjeTreninga
            })
            alert('Uspesno poslat predlog')
            props.onClose()
        } catch (err) {
            console.log(err.response.data)
            alert('Doslo je do greske')
        }

    }

    return (
        <Modal onClose={props.onClose}>
            <Box className='cardCenter marginS' sx={{ gap: '1vh', padding:{sm:'0% 20%' }, alignItems: "stretch", display: 'flex', flexDirection: 'column' }}>
 
            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Predlog treninga</Typography>
                   
                <DropDown labela='Tip treninga' set={setTip} niz={tip} value={tipTreninga} />
                <DropDown labela='Intenzitet treninga' set={setIntenzitet} niz={intenzitet} value={intenzitetTreninga} />
                <DropDown labela='Trajanje treninga' set={setTrajanje} niz={trajanje} value={trajanjeTreninga} />

                <Box sx = {{mt:'5%'}}>
                    <Button fullWidth  size = 'small' variant = "outlined" onClick={posaljiIzmenu}>Posalji</Button>
                </Box>

            </Box>
        </Modal>
    )
}
export default FormaPosaljiPredlog