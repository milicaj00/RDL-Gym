import '../styles/loginForma.css'
import { useState, useEffect } from "react";
import { LoginMetoda, PostMetoda } from '../komponente/Fetch';
import { useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, TextField, Box, Typography, IconButton} from '@mui/material';
import { useNavigate } from "react-router-dom";
import Info from '../komponente/Inputi/Info'
import axios from 'axios';
import { LoginSuccess } from '../context/UserActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const upisiTrenera = (zahtev, setData, setGreskaa, setIsLoading) => {
    PostMetoda(zahtev, setData, setGreskaa, setIsLoading)
}

const upisiKorisnika = async (zahtev, dispatch) => {
    await axios.post(zahtev.url, zahtev.body).then((p) => {
        if (p.status === 200) {
            dispatch(LoginSuccess(p.data))
            console.log(p.data)

            localStorage.setItem('token', p.data?.token)

            let userId = ''
            if (p.data?.korisnikId)
                userId = p.data?.korisnikId
            else if (p.data?.trenerId)
                userId = p.data.trenerId
            else if (p.data?.upravaId)
                userId = p.data.upravaId

            // localStorage.setItem("user", JSON.stringify(state.user))

            localStorage.setItem("userId", userId)
            document.cookie = 'token=' + p.data.refreshToken
        }
        return true
    }).catch((error) => {

        if (error.response.status === 400) {
            alert('Pogresna lozinka')
        }
        else {
            alert('doslo je do greske')
        }
        return false
    })
}

const format = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
}

const Register = (props) => {

    const { user, ucitavaSe, dispatch } = useContext(UserContext);


    const [greska, setGreska] = useState(
        {
            ime: false,
            prezime: false,
            mail: false,
            lozinka: false,
            brojTelefona: false,
            username: false
        });

    const ime = useRef('')
    const prezime = useRef('')
    const email = useRef('')
    const lozinka = useRef()
    const brojTelefona = useRef()
    const username = useRef()

    const [data, setData] = useState('')
    const [greskaa, setGreskaa] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [success, setSuccess] = useState(false)
    let navigate = useNavigate()

    const checkMail = async () => {
        console.log('proveri mejl')

        setGreska((greska) => ({ ...greska, mail: false }))

        try {
            await axios.post('http://localhost:8800/api/auth/proveriEmail', {
                email: email.current.value
            })

        } catch (err) {
            if (err.response?.status === 404) {
                setGreska((greska) => ({ ...greska, mail: true }))
                console.log(err.response)
            }
        }

    }

    const checkUsername = async () => {
        console.log('proveri username')

        setGreska((greska) => ({ ...greska, username: false }))

        try {
            await axios.post('http://localhost:8800/api/auth/proveriUsername', {
                username: username.current.value
            })

        } catch (err) {
            if (err.response?.status === 404) {
                setGreska((greska) => ({ ...greska, username: true }))
                console.log(err.response)
            }
        }

    }

    const upis = (ev) => {

        ev.preventDefault()

        setGreska({ ime: false, prezime: false, mail: false, lozinka: false, brojTelefona: false, username: false })

        let pom = true;
        if (ime.current.value === '' || ime.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, ime: true }))
            pom = false
        }
        if (prezime.current.value === '' || prezime.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, prezime: true }))
            pom = false
        }
        if (brojTelefona.current.value == '' || (brojTelefona.current.value.length < 9 && brojTelefona.current.value.length < 12)) {
            setGreska((greska) => ({ ...greska, brojTelefona: true }))
            pom = false
        }
        const mail = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

        if (email.current.value === '' || !email.current.value.match(mail)) {
            setGreska((greska) => ({ ...greska, mail: true }))
            pom = false
        }
        if (lozinka.current.value === '' || lozinka.current.value.length < 6) {
            setGreska((greska) => ({ ...greska, lozinka: true }))
            pom = false
        }
        if (username.current.value === '' || username.current.value.length < 4) {
            setGreska((greska) => ({ ...greska, username: true }))
            pom = false
        }
        if (pom === true) {

            const zahtev = {
                url: 'http://localhost:8800/api/auth/register',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: {
                    'ime': format(ime.current.value),
                    'prezime': format(prezime.current.value),
                    'brojTelefona': brojTelefona.current.value,
                    'email': email.current.value,
                    'username': username.current.value,
                    'password': lozinka.current.value,
                    tipKorisnika: user ? 'Trener' : ''
                }
            }

            let error = false
            if (user && props.setIdTrenera) {
                upisiTrenera(zahtev, setData, setGreskaa, setIsLoading)
            } else {
                error = upisiKorisnika(zahtev, dispatch)
            }

            if (error) return

            if (greskaa !== false) {
                alert(greskaa)
                return
            }

            setSuccess(true)

            if (props.onClose)
                props.onClose()
        }
    }

    useEffect(() => {
        //sessionStorage.setItem("idTrenera", JSON.stringify(data._id))
        if (props.setIdTrenera)
            props.setIdTrenera(data._id)

    }, [data])

    // if (success && !props.setIdTrenera) {
    //     navigate(`/profil`, { replace: true });

    // }

    return (
        <div className="forma cardCenter marginS">
            {ucitavaSe && <CircularProgress size='2rem' disableShrink />}

            {!success &&
                <form className="login" onSubmit={upis}>

                    <Box className="login">
                        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>Registrujte se:</Typography>

                        <Info labela='Ime*' tip='text' reff={ime} err={greska.ime} tekst='najmanje 3 slova' />

                        <Info labela='Prezime*' tip='text' reff={prezime} err={greska.prezime} tekst='najmanje 4 slova' />

                        <Info labela='E-mail*' tip='email' reff={email} err={greska.mail} tekst='mail@gmail.com' onBlur={checkMail} />
                        {greska.mail && <span className='greska'>Posoji korisnk sa tim mejlom!</span>}

                        <Info labela='Username*' tip='text' reff={username} err={greska.username} tekst='najmanje 4 karaktera' onBlur={checkUsername} />
                        {greska.username && <span className='greska'>Posoji korisnk sa tim username!</span>}

                        <Info labela='Lozinka*' tip='password' reff={lozinka} err={greska.lozinka} tekst='najmanje 6 karaktera' />

                        <Info labela='Broj telefona*' tip='text' reff={brojTelefona} err={greska.brojTelefona} tekst='+381 623 212 123' />

                    </Box>

                    <Button size='small' variant="contained" onClick={upis}>Registruj se</Button>
                </form>}

                {success &&
            <Box className = 'cardCenter marginS'>
            <IconButton disableRipple = 'true' color = 'success'>
                <CheckCircleIcon  sx = {{fontSize:'5rem'}}/>
            </IconButton>
               <Typography textAlign = 'center' variant = 'h4'>Uspesno ste registrovali trenera!</Typography>
            </Box>
            }

        </div >

    )
}

export default Register