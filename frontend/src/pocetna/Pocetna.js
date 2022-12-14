import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Carousel } from 'react-carousel-minimal';
import { UserContext } from "../context/UserContext";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Pocetna = () => {
    //const toTop = () => window.scrollTo(0,0)
    const { user, ucitavaSe } = useContext(UserContext)
    // let navigate = useNavigate()
    // if (user) navigate(-1)

    // console.log(ucitavaSe)

    // const navigate = useNavigate()
    // const location = useLocation()
    // const from = location.state?.from?.pathname || "/";

    // if (user) navigate(from, { replace: true })

    const data = [
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-1-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6581-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6584-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6605-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-2-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-1-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-2-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6637-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-3-1024x686.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-5-1024x686.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/DSC_6663-1024x682.jpg',
        },
        {
            image: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-6-1024x686.jpg',
        }
    ];

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }


    return (

        <Box>

            <Box className='container' sx={{ marginBottom: '10%' }}>
                <Box fullWidth className = 'pozadinaPoruka'>
                    <Box className="poruka"> Krenimo zajedno u novu avanturu </Box>
                    <Link to='/treneri'>
                        <Button variant="outlined" id='centralBtn' size='large' startIcon = {<FitnessCenterIcon/>} endIcon = {<FitnessCenterIcon/>} sx={{ backgroundColor: 'secondary.contrastText'}}>
                            Zakazite trening
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box sx={{ margin: "0% 5%" }}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4} >
                        <Typography gutterBottom variant='h6' textAlign='center'> Personalni treninzi</Typography>
                        <Typography variant='body1' textAlign='justify'>
                        Personalni trener je tu da od po??etka do kraja prati tvoje fitnes putovanje ??? od inicijalnog merenja i razogovora na po??etku, preko redovnih treninga i njihovih modifikacija u skladu sa tvojim napretkom, pa sve do kontrolnih merenja i provera ostvarenih rezultata.

Trening uz sprave, slobodno ve??banje, kardio, core, funkcionalni ili trening snage ??? sve ovo ti je, izme??u ostalog, na raspolaganju.

Personalni trener ??e zadovoljiti tvoje posebne potrebe i ??elje, bilo da se radi o potrebi pobolj??anja op??teg stanja i kondicije, smanjenja te??ine ili sprovo??enju programa rehabilitacionog sadr??aja.                        
                         </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant='h6' textAlign='center'> Mens sana in corpore sano</Typography>
                        <Typography variant='body1' textAlign='justify' >
                        ??esto govorimo o psihi i telu kao da su potpuno odvojeni, ??to naravno ne mo??e biti istina. Jednostavno je, stanje uma utic??e na telo, i obrnuto. Istina je slede??a: Da bi um i telo funkcionisali ispravno i bili u skladu, telu je potrebna redovna fizi??ka aktivnost. Svakako ako ve??bate i ako ste aktivni osec??ac??ete se odlic??no i bic??ete puni energije. Vec??ina ljudi poc??inje da vez??ba zbog fizic??ke kondicije, lepog izgleda, odlaska na bazen ili na more, unapre??enja fizic??kog zdravlja, ali mnogi nisu svesni neverovatne mentalne koristi koja se dobija kroz kontinuiranu fizi??ku aktivnost.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant='h6' textAlign='center'> Grupni treninzi</Typography>
                        
                        <Typography variant='body1' textAlign='justify'>
                        Grupne ve??be pru??aju nesvakida??nju priliku dru??enja tokom ve??banja i pru??aju mnogo vi??e samopouzdanja. Pored toga, ne mora?? da anga??uje?? personalnog trenera jer ima?? grupnog, koji ti pru??a sve neophodne informacije da uradi?? ve??bu pravilno. Pored toga, studije pokazuju da se mnogo vi??e topi salo u toku grupnog ve??banja iz razloga ??to ti ne ??eli?? da odustane?? i bude?? ba?? ta osoba koja nije izgubila ni gram. Pa se trudi?? da trenira?? ja??e, bolje i vi??e.Grupne ve??be odli??ne su za motivaciju jer cela grupa ohrabruje i daje energiju drugima da urade vi??e.                          
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Carousel
                    data={data}
                    time={2000}
                    width="100%"
                    height="500px"
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={slideNumberStyle}
                    captionPosition="bottom"
                    automatic={true}
                    dots={true}
                    pauseIconColor="white"
                    pauseIconSize="40px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                        textAlign: "center",
                        maxHeight: "500px",
                        margin: "10% 5%",
                    }}
                />
            </Box>

        </Box>
    )
}

export { Pocetna }