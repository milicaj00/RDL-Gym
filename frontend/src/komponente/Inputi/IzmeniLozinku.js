import { useState, useContext, useRef, Fragment } from "react";
import { UserContext } from '../../context/UserContext'
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";
import './../../styles/input.css'
import useAxiosPrivate from "../../api/useAxiosPrivate";


const IzmeniLozinku = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const { user } = useContext(UserContext);
    const [novaLozinka, setNova] = useState(false)
    const pass = useRef()
    const otkaziIzmenu = () => {
        setNova(false)
        props.onClose()
    }

    const proveriLozinku = async () => {

        if (pass.current.value == '') {
            alert('Morate uneti lozinku')
            return
        }
        if (pass.current.value.length < 6) {
            alert('Lozinka mora imati najmanje 6 karaktera')
            return
        }

        await axiosPrivate.post(' http://localhost:8800/api/auth/proveriSifru', {
            id: user.id,
            password: pass.current.value
        }).then((p) => {

            if (p.status === 200) {
                setNova(true)
                
                console.log(p)
            }
        }).catch((error) => {
            if (error.response.status)
                alert(error.response.data)
            else
                alert('Doslo je do greske')
        });
    }

    const izmeniLozinku = async () => {

        if (pass.current.value == '') {
            alert('Morate uneti lozinku')
            return
        }
        if (pass.current.value.length < 6) {
            alert('Lozinka mora imati najmanje 6 karaktera')
            return
        }

        await axiosPrivate.put('http://localhost:8800/api/registrovaniKorisnik/' + user.id, {
            registrovaniKorisnikId: user.id,
            password: pass.current.value
        }).then((p) => {
            if (p.status === 200) {
                alert('Uspesno ste promenili lozinku')
                otkaziIzmenu()
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const Lozinka = ({ tekst, OKonClick }) => {
        return (

            <Fragment>
                <TextField
                    id="outlined-textarea"
                    label={tekst}
                    placeholder="Lozinka"
                    variant="outlined"
                    type='password'
                    color="primary"
                    size="small"
                    inputRef={pass}
                />

                <Box display = "flex" justifyContent={"center"}>
                    <Button variant="contained" size='small' sx={{ margin: "1%" }} onClick={OKonClick}>Ok</Button>
                    <Button variant="contained" size='small' sx={{ margin: "1%" }} onClick={otkaziIzmenu}>Otkazi</Button>
                </Box>
            </Fragment>
        )
    }

    return (
        <Box sx ={{ paddingLeft:'0', paddingRight: '0' }}>

            {!novaLozinka && <Lozinka tekst='Unesite staru lozinku' OKonClick={proveriLozinku} />}
            {novaLozinka && <Lozinka tekst='Unesite novu lozinku' OKonClick={izmeniLozinku} />}

        </Box>
    )
}

export default IzmeniLozinku