import React, { useState, useEffect, useCallback } from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Obavestenja from './Obavestenja'
import useAxiosPrivate from '../../api/useAxiosPrivate'

const Zvonce = ({ user, status }) => {

    const axiosPrivate = useAxiosPrivate()

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [greska, setGreska] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data1, setData1] = useState([])

    // const { user } = useContext(UserContext);


    useEffect(() => {
        let url = ''
        if (status) {
            url = 'http://localhost:8800/api/zahtev/vratiZahteveTrenera/' + user
        }
        else {
            url = 'http://localhost:8800/api/zahtev/vidiZahteveZaKorisnika/' + user
        }

        const get = async () => {
            await axiosPrivate.get(url).then(res => {
                if (res.status === 200) {

                    if (res.data && data !== res.data) {
                        setData(res.data)
                    }
                   // console.log(data)
                }
            }).catch((error) => {
                alert('Doslo je do greske')
                console.log(error)
            });
        }

        get()

    }, [refresh])

    setInterval(() => {
        setRefresh(!refresh)
    }, 100000);

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const newNotifications = `You have ${data.length} new notifications!`;
    const noNotifications = 'No new notifications';

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={data.length ? newNotifications : noNotifications}>
                <IconButton
                    sx={{ color: 'white' }}
                    onClick={data?.length ? handleOpen : null}
                >
                    <Badge
                        badgeContent={data?.length}
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Obavestenja
                open={open}
                handleClose={handleClose}
                menuItems={data}
                anchorEl={anchorEl}
                refresh={() => setRefresh(!refresh)}
            />

        </div>
    )
}

export default Zvonce