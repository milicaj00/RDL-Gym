import { Button, Typography, TextField } from "@mui/material"
import { Box, } from "@mui/system"
import { useRef, useState } from "react"
import DropDown from "../Inputi/DropDown"
import useAxiosPrivate from "../../api/useAxiosPrivate"
import Info from "../Inputi/Info"
import axios from 'axios'

const tagovi = ['Zdravlje', 'Fitnes', 'Ishrana', 'Trening']


const FormaDodajBlog = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const naslov = useRef()
    const kratakOpis = useRef()
    const tekst = useRef()

    const [tag, setTag] = useState('')
    const [file, setFile] = useState('')


    const dodajBlog = async (event) => {

        if (naslov.current.value === ''
            || tekst.current.value === ''
            || tag === ''
            || kratakOpis.current.value === ''
        ) {
            alert('Morate uneti sve podatke')
            return
        }

        const formData = new FormData();
        formData.append('file', file);

        formData.append('naslov', naslov.current.value);
        formData.append('tekst', tekst.current.value);
        formData.append('tagovi', tag);
        formData.append('kratakopis', kratakOpis.current.value);


        await axiosPrivate.post('http://localhost:8800/api/blog/dodajBlog', formData, {
            body: {
                naslov: naslov.current.value,
                tekst: tekst.current.value,

                tagovi: tag,
                kratakopis: kratakOpis.current.value,

            }
        }).then(p => {
            if (p.status === 200) {
                alert('Uspesno dodat blog')
                window.location.reload()

            }
        }).catch((error) => {
            alert('Doslo je do greske')
            console.log('greska prilkom upisa: ' + error.message)
        });
        //  props.onClose()

    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    //labela, tip, reff, err, tekst
    //{ labela, set, niz, value }

    return (

        <Box className='cardCenter marginS' sx={{ gap: '1vh', padding: { sm: '0% 20%' }, alignItems: "stretch" }}>

            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Blog</Typography>

            <Info sx={{ width: '100%' }} labela='Naslov' tip='text' reff={naslov} />
            <DropDown labela='Tag' set={setTag} niz={tagovi} value={tag} />
            <Info sx={{ width: '100%' }} multiline labela='Kratak opis' tip='text' reff={kratakOpis} rows={3} />
            <Info sx={{ width: '100%' }} className='prelomi' multiline labela='Tekst' tip='text' reff={tekst} rows={4} />

            <Info sx={{ width: '100%' }} fullWidth tip='file' onChange={(ev) => { setFile(ev.target.files[0]); }} />

            <Box sx = {{mt:'5%'}} >
                <Button fullWidth variant='outlined' onClick={dodajBlog}>Unesi</Button>
            </Box>

        </Box>
    )
}
export default FormaDodajBlog