import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Grid, Link, Container, Typography, Box, iconStyle, TextField } from '@mui/material';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {'© '}
      <Link color="inherit" href="/pocetna">
        RaketaDoLeta
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  return ( 
    
      <Box
        component="footer"
        id = "kontakt"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
      <iframe
                    title='myfeame'
                    src="https://www.google.com/maps/d/u/0/embed?mid=19cj8tl1EbeOvv5qFskSkS0gjx2VSgMA&ehbc=2E312F"  
                    width="100%"
                    height="240"
                    margin = "15 vh 15 vw"
                    frameBorder="0"
                    style={{border:2, marginBottom:'2vh'}}
                    allowFullScreen/>          
          
      <Box>
        <Container maxWidth="lg">
          <Grid container spacing = {5} alignItems= "flex-start"  mb = {2}>
            <Grid item xs = {12} sm ={4} >
              <RocketLaunchOutlinedIcon sx={{mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/pocetna"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: 'inherit',
                }}
              >
              RaketaDoLeta
              </Typography>
              <Box sx = {{display:'flex'}}>
              <Box>
                <Link href="https://instagram.com" target="_blank" rel="noopener" >
                <InstagramIcon/>
                </Link>
              </Box>
              <Box>
              <Link href="https://twitter.com" target="_blank" rel="noopener" >
                <TwitterIcon/>
                </Link>
              </Box>
              <Box>
                <Link href="https://facebook.com" target="_blank" rel="noopener" >
                <FacebookIcon/>
                </Link>
              </Box>
              <Box>
                <Link href="https://youtube.com" target="_blank" rel="noopener" >
                <YouTubeIcon/>
                </Link>
              </Box>
            </Box>
              
            </Grid>
            <Grid item xs = {12} sm ={4}>
              <Box border borderBottom={1} >Kontaktirajte nas:</Box>
              <Box sx = {{display:'flex', flexDirection:'row', alignItems: 'center', marginTop: '2%'}}>
                <LocationOnOutlinedIcon/>
                <Link sx = {{marginLeft: '2%'}} href="https://goo.gl/maps/Akp9XkeKBDunKv41A" target="_blank" rel="noopener" >
                  <Typography variant="caption" color="text.secondary">
                  Aleksandra Medvedeva 14
                  </Typography>
                </Link>
              </Box>
              <Box sx = {{display:'flex',flexDirection:'row', alignItems: 'center '}}>
                <EmailOutlinedIcon/>
                  <Typography  sx = {{marginLeft: '2%'}} variant="caption" color="text.secondary">
                  raketadoleta@gmail.com
                  </Typography>
              </Box>
              <Box sx = {{display:'flex', flexDirection:'row', alignItems: 'center '}}>
                <PhoneOutlinedIcon/>             
                  <Typography  sx = {{marginLeft: '2%'}} variant="caption" color="text.secondary">
                  +381 66 2568459
                  </Typography>
              </Box>
            </Grid>
            <Grid item xs = {12} sm ={4}>
              <Box border borderBottom={1}>Mapa sajta:</Box>
              <Box sx = {{marginTop: '2%'}}>
                <Link href='/treneri'>
                    Treneri
                </Link>
              </Box>
              <Box>
                <Link href='/grupnitreninzi'>
                    Grupni treninzi
                </Link>
              </Box>
              <Box>
                <Link href='/onama' >
                    O nama
                </Link>
              </Box>
              <Box>
                <Link href='/blog'>
                  Blog
                </Link>
              </Box>
              <Box>
                <Link href='/usluge' >
                  Cenovnik
                </Link>
              </Box>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
 
      <Copyright />

    </Box>
  )
}

export default Footer