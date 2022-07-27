import RasporedTrener from "../../komponente/Tabele/RasporedTrener";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import { UserContext } from "../../context/UserContext";
import { CircularProgress, Box, Typography, getTouchRippleUtilityClass } from '@mui/material'

const OdbijeniTreninzi = () => {

    const axiosPrivate = useAxiosPrivate()
    const { user } = useContext(UserContext)
    const [treninzi, setTreninzi] = useState([])
    const [loading, setIsLoading] = useState(true)


    useEffect(() => {
        const get = async () => {
            try {
                setIsLoading(true)
                const res = await axiosPrivate.get("http://localhost:8800/api/trening/vratiProsleTreninge/" + user.trenerId)
                console.log(res)
                if (res.data) {
                    setTreninzi(res.data)
                }
                setIsLoading(false)

            }
            catch (err) {
                setIsLoading(false)

            }
        }
        get()
    }, [])


    return (
        <Box className="cardCenter marginS">

            <Typography gutterBottom component="div" variant="h4" textAlign="center">Prosli treninzi</Typography>
            <RasporedTrener prosli={true} treninzi={treninzi} />


        </Box>
    )

}
export default OdbijeniTreninzi