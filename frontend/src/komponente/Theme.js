import { createTheme } from "@mui/material";



const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#f8af00',
        light: '#111111',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#f8af00',
        contrastText:'#000000'
      },
      error: {
        main: '#f83200',
      },
      
    },
  });
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#f8af00',
        contrastText: 'white',
        light: 'white',
      },
      secondary: {
        main: '#000000',
        contrastText:'#fff'
      },
      error: {
        main: '#f83200',
      },
    },
    
  });

 export{lightTheme,darkTheme}