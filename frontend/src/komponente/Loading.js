import { lightTheme, darkTheme } from "./Theme";
import React from "react";
import { Box } from "@mui/system";
import { LinearProgress, CircularProgress ,ThemeProvider, Typography, Paper } from "@mui/material";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';



const Loading = () => {

    const t = sessionStorage.getItem('tema')

    const theme = t === 'dark' ? darkTheme : lightTheme

    return (
        <ThemeProvider theme={theme}>
            <Paper>
            <Box className = 'cardCenter'sx = {{width :'99vw', height: '100vh'}}>
                    <Box display = 'flex' alignItems = 'center'>
                        <RocketLaunchOutlinedIcon sx = {{color: 'primary.main', fontSize:'3rem'}} />
                        <Typography
                            variant="h4"
                            noWrap
                            sx={{
                                ml: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            RaketaDoLeta
                        </Typography>
                    </Box>
                    <Box sx = {{width: '90vw', padding: '5vh'}}>
                    <LinearProgress />
                    </Box>
            </Box>
            </Paper>
        </ThemeProvider >
    )
}

export default Loading