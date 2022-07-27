import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Badge } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { UserContext } from '../../context/UserContext';
import Zvonce from '../Obavestenje/Zvonce'
import NoviZahtev from "./NoviZahtev";


const NavbarTrener = () => {

    const { user, dispatch } = useContext(UserContext);

    const pages = [
        { val: 'Profil', link: '/profil' },
        { val: 'Korisnici', link: `/RDL/trener/korisnici` },
        //  { val: 'zahtevi', link: `/RDL/trener/${user.ime}/zahtevi` },
        { val: 'Prosli treninzi', link: `/RDL/trener/odbijenizahtevi` }

    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let navigate = useNavigate();

    return (
        <AppBar position="sticky" color="primary">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* POGLED ZA DESKTOP*/}
                    <RocketLaunchOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/profil"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        RaketaDoLeta
                    </Typography>

                    {/*ZA DESKTOP SREDINA*/}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.val}
                                href={page.link}
                                sx={{ my: 2, color: 'white', textAlign: 'center', display: 'block' }}
                            >
                                {page.val}
                            </Button>

                        ))}

                        <Box sx={{ my: 2, display: { xs: 'none', md: 'flex' } }}>
                            <NoviZahtev />
                        </Box>

                    </Box>



                    {/*OVO JE ZA MOBILNI MENI LEVO */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page, i) => (
                                <Link to={page.link} key={page.val} >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.val}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}

                        </Menu>
                    </Box>





                    {/*ZA MOBILNI SREDINA */}
                    <RocketLaunchOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, color: 'white', mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/profil"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'white',
                            textDecoration: 'none',
                            flexGrow: '1'
                        }}
                    >
                        RDL
                    </Typography>


                    <Box sx={{ my: 2, display: { xs: 'flex', md: 'none' } }}>
                        <NoviZahtev />
                    </Box>

                     {user && <Zvonce user={user.id} status={"Ukinuto"} />} 

                    <Tooltip title="Account">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >

                        <MenuItem onClick={() => { navigate("../profil", { replace: true }); }}>
                            <Typography textAlign="center">Profil</Typography>
                        </MenuItem>

                        <MenuItem onClick={() => { dispatch({ tip: "ODJAVI" }); handleCloseUserMenu(); navigate('../pocetna', { replace: true }) }}>
                            <Typography textAlign="center">Odjavi se</Typography>
                        </MenuItem>


                    </Menu>

                </Toolbar>
            </Container>
        </AppBar >
    );
};
export default NavbarTrener;
