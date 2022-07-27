import { Fragment } from "react"
import React, { useContext, useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import { UserContext } from '../../context/UserContext';
import useAxiosPrivate from "../../api/useAxiosPrivate";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const NoviZahtev = () => {
    const { user } = useContext(UserContext);

    const axiosPrivate = useAxiosPrivate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {

        //GetData('http://localhost:8800/api/zahtev/vidiZahteve/' + user.id + '/Na cekanju', setData, setGreska, setIsLoading)

        const get = async () => {
            await axiosPrivate.get('http://localhost:8800/api/zahtev/vidiZahteve/' + user.id + '/Na cekanju')
                .then(res => {
                    if (res.status === 200) {

                        if (res.data ) {
                            setData(res.data)
                        }
                    }
                }).catch((error) => {
                    alert('Doslo je do greske')
                    console.log(error)
                });
        }
        get()

    }, [refresh])

    // setInterval(() => {
    //     setRefresh(!refresh)
    // }, 10000);

    return (
        <Fragment>
            <Badge
                badgeContent={data.length}
                color="error"
                sx = {{padding:'0px'}}
            >
                <Button
                    href={`/RDL/trener/${user.ime}/zahtevi`}
                    sx={{ m: 0, color: 'white', textAlign: 'center', display: { xs: 'none', md: 'flex'} }}
                >
                    Zahtevi
                </Button>
                <IconButton
                size="large"
                href={`/RDL/trener/${user.ime}/zahtevi`}
                sx={{ color: "white", display:{ xs: 'flex', md: 'none'}, padding: '0px'}}
                >
                <AssignmentTurnedInIcon />
                </IconButton>

            </Badge>
        </Fragment>
    )
}
export default NoviZahtev