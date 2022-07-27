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
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LoginIcon from '@mui/icons-material/Login';
import { UserContext } from '../../context/UserContext';
import { Switch } from "@mui/material";
import Zvonce from '../Obavestenje/Zvonce'


const pages = [
  { val: 'Treneri', link: '/treneri' },
  { val: 'Grupni treninzi', link: 'grupnitreninzi' },
  { val: 'O nama', link: '/onama' },
  { val: 'Blog', link: '/blog' },
  { val: 'Cenovnik', link: '/usluge' },
  { val: 'Kontakt', link: '#kontakt' },
];

// const settings = [
//   { val: 'Profil', link: '/profil' },
//   { val: 'Napredak', link: '/napredak' },
//   { val: 'Zakazani treninzi', link: '/treninzi' },
//   { val: 'Odjavi se', link: '' },
// ];


const settings = ['Profil', 'Napredak', 'Treninzi', 'Odjavi se'];

const Navbar = ({ check, change }) => {

  const { user, dispatch } = useContext(UserContext);


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

  const handleUserMenu = (setting) => {
    console.log(setting)
    switch (setting) {
      case 'Profil':
        navigate("../profil", { replace: true });
        break;
      case 'Napredak':
        navigate("../napredak", { replace: true });
        break;
      case 'Treninzi':
        navigate("../vasitreninzi", { replace: true });
        break;

      default:
        dispatch({ tip: "ODJAVI" })
        navigate('../pocetna')
        break;
    }
    handleCloseUserMenu()
  }


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
            href="/pocetna"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
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
          </Box>



          {/*OVO JE ZA MOBILNI MENI LEVO */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "white" }}
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
          <RocketLaunchOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/pocetna"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            RDL
          </Typography>


          {/*ZA MOBILNI DESNI MENI KAD KORISNIK NIJE LOGOVAN */}
          {!user &&
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
              <Tooltip title="Login">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                  <LoginIcon />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-login"
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
                <Link to='/login' >
                  <MenuItem key='Log in' onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"> Prijavi se</Typography>
                  </MenuItem>
                </Link>
                <Link to='/signup' >
                  <MenuItem key='Sign up' onClick={handleCloseUserMenu}>
                    <Typography textAlign="center"> Registruj se</Typography>
                  </MenuItem>
                </Link>
              </Menu>

            </Box>
          }


          <Box sx={{ flexGrow: 0 }}>
            {/* <Switch
              // defaultChecked
              color='default'
              onChange={change}
              checked={check}
            /> */}

            {
              !user &&
              <Button
                variant='contained'
                color='secondary'
                href='/login'
                sx={{ color: 'white', display: { xs: 'none', md: 'inline' } }}
              >
                Prijavi se
              </Button>
            }

            {
              !user &&
              <Button
                variant='contained'
                color='secondary'
                href='/signup'
                sx={{ m: 1, color: 'white', display: { xs: 'none', md: 'inline' } }}
              >
                Registruj se
              </Button>

            }
            {user &&
              <Box display='inline-flex'>

                <Zvonce user={user.id} />
                
                <Tooltip title="Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            }
            {user &&
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
                {settings.map((setting) => (

                  <MenuItem key={setting} onClick={() => { handleUserMenu(setting) }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>

                ))}
              </Menu>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default Navbar;
