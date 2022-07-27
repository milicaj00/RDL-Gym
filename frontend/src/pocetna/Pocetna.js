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
                        Personalni trener je tu da od početka do kraja prati tvoje fitnes putovanje – od inicijalnog merenja i razogovora na početku, preko redovnih treninga i njihovih modifikacija u skladu sa tvojim napretkom, pa sve do kontrolnih merenja i provera ostvarenih rezultata.

Trening uz sprave, slobodno vežbanje, kardio, core, funkcionalni ili trening snage – sve ovo ti je, između ostalog, na raspolaganju.

Personalni trener će zadovoljiti tvoje posebne potrebe i želje, bilo da se radi o potrebi poboljšanja opšteg stanja i kondicije, smanjenja težine ili sprovođenju programa rehabilitacionog sadržaja.                        
                         </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant='h6' textAlign='center'> Mens sana in corpore sano</Typography>
                        <Typography variant='body1' textAlign='justify' >
                        Često govorimo o psihi i telu kao da su potpuno odvojeni, što naravno ne može biti istina. Jednostavno je, stanje uma utiče na telo, i obrnuto. Istina je sledeća: Da bi um i telo funkcionisali ispravno i bili u skladu, telu je potrebna redovna fizička aktivnost. Svakako ako vežbate i ako ste aktivni osećaćete se odlično i bićete puni energije. Većina ljudi počinje da vežba zbog fizičke kondicije, lepog izgleda, odlaska na bazen ili na more, unapređenja fizičkog zdravlja, ali mnogi nisu svesni neverovatne mentalne koristi koja se dobija kroz kontinuiranu fizičku aktivnost.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography gutterBottom variant='h6' textAlign='center'> Grupni treninzi</Typography>
                        
                        <Typography variant='body1' textAlign='justify'>
                        Grupne vežbe pružaju nesvakidašnju priliku druženja tokom vežbanja i pružaju mnogo više samopouzdanja. Pored toga, ne moraš da angažuješ personalnog trenera jer imaš grupnog, koji ti pruža sve neophodne informacije da uradiš vežbu pravilno. Pored toga, studije pokazuju da se mnogo više topi salo u toku grupnog vežbanja iz razloga što ti ne želiš da odustaneš i budeš baš ta osoba koja nije izgubila ni gram. Pa se trudiš da treniraš jače, bolje i više.Grupne vežbe odlične su za motivaciju jer cela grupa ohrabruje i daje energiju drugima da urade više.                          
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