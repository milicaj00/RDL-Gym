import '../../styles/kalendar.css'
import { useState, Fragment } from 'react'
import { Box, } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import RasporedGrupni from './RasporedGrupni'
import RasporedTrener from './RasporedTrener'

const termini1 = [{ trajanje: 60, vreme: 17 }, { trajanje: 45, vreme: 18 }]
const termini2 = [{ trajanje: 45, vreme: 13 }, { trajanje: 30, vreme: 19 }]
const t = { trajanje: 45, vreme: 13 }

const nadjiDan = (broj) => {
    let pom = ''
    switch (broj) {
        case 1:
            pom = 'Pon'
            break;
        case 2:
            pom = 'Uto'
            break;
        case 3:
            pom = 'Sre'
            break;
        case 4:
            pom = 'Cet'
            break;
        case 5:
            pom = 'Pet'
            break;
        case 6:
            pom = 'Sub'
            break;

        default:
            pom = 'Ned'
            break;
    }

    return pom
}

const format = (datum) => {
    return datum.getDate() + "." + (+datum.getMonth() + 1) + "." + datum.getFullYear() + "."
}

const KalendarForma = (props) => {

    console.log(props)

    const dan = (new Date()).getDay();
    const dateOD = new Date()
    let dateDO = new Date()
    dateDO.setDate(dateOD.getDate() + 7)

    const [termin, setTermin] = useState({ status: true, datum: new Date().toDateString(), vreme: '', trajanje: '' })

    const prikaziTermine = async (ev) => {

        const d = ev.target.id
        const datumProba = new Date(d)
        const datumZaSlanje = datumProba.toISOString()

        setTermin({ status: true, datum: datumZaSlanje })
    }

    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(parseInt(event.target.tabIndex));
    };

    const Day = (props) => {

        let pomDatum = new Date()
        pomDatum.setDate(new Date().getDate() + parseInt(props.broj))

        return (
            <Tab
                sx={{ minHeight: { xs: 10, sm: 50 }, }}
                onClick={prikaziTermine}
                id={pomDatum.toDateString()}
                value={props.broj}
                label=
                {nadjiDan((dan + props.broj) % 7) + ' ' + pomDatum.getDate()}
                tabIndex={props.broj}
                onChange={handleChange}
            />
        )
    }

    let datumi = []

    for (let i = 0; i < 15; i++) {
        datumi.push(
            <Day key={i} broj={i} />
        )
    }

    let daysinmonth = datumi.map((d, i) => {
        return d;
    });


    return (
        <Box className="cardCenter" >
            <Box>
                <Box
                    sx={{
                        flexGrow: 1,
                        maxWidth: { xs: 320, sm: 700 },
                        bgcolor: 'background.paper',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        sx={{
                            [`& .${tabsClasses.scrollButtons}`]: {
                                '&.Mui-disabled': { opacity: 0.3 },
                            },
                        }}
                    >
                        {daysinmonth}
                    </Tabs>
                </Box>

            </Box>

            {termin.status &&

                <>

                    {props.idUsluge && <RasporedGrupni idUsluge={props.idUsluge} datum={termin.datum} />}

                    {props.idTrenera && <RasporedTrener idTrenera={props.idTrenera} datum={termin.datum} />}

                </>
            }
        </Box >
    )

}
export default KalendarForma