import { useState, useContext, Fragment } from "react";
import { UserContext } from '../context/UserContext';
import '../styles/userPocetna.css'
import Korisnik from '../profil/ProfilKorisnik'
import Uprava from '../profil/ProfilUprava'
import Trener from '../profil/ProfilTrener'
import { Box } from "@mui/material";


const UserPocetna = () => {

    const { user } = useContext(UserContext);

    console.log(user)

    return (
        <Box>
            {/* <Korisnik/> */}
            {(user.tip == 'Korisnik' || !user.tip) && <Korisnik />}
            {user.tip == 'Trener' && <Trener />}
            {user.tip == 'Uprava' && <Uprava />}
        </Box>
    )

}

export default UserPocetna