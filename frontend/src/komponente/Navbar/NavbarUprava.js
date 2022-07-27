import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const NavbarUprava = () => {

    const { user, dispatch } = useContext(UserContext);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                    </Box>


                    {/*ZA MOBILNI SREDINA */}

                    <RocketLaunchOutlinedIcon sx={{ display: { xs: 'block', md: 'none' }, mr: 1, color:'white' }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/profil"
                        sx={{
                            mr: 2,
                            display: { xs: 'block', md: 'none' },
                            flexGrow: '1',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'white',
                            textDecoration: 'none',
                        }}
                    >
                        RDL
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , color:'white'}}>
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

                            <MenuItem onClick={() => { dispatch({ tip: "ODJAVI" }); handleCloseUserMenu(); navigate('../pocetna', {replace:true}) }}>
                            <Typography textAlign="center">Odjavi se</Typography>
                        </MenuItem>


                    </Menu>
                </Box>
            </Toolbar>
        </Container>
        </AppBar >
    );
};
export default NavbarUprava;
