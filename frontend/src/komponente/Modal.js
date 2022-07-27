import { Paper, Box, CssBaseline, ThemeProvider, createTheme, IconButton } from "@mui/material";
import ReactDOM from "react-dom";
import CancelIcon from '@mui/icons-material/Cancel';
import { lightTheme, darkTheme } from "./Theme";

import '../styles/Modal.css'

const modalRoot = document.getElementById("forma");

const Modal = (props) => {

    const t = sessionStorage.getItem('tema')

    const theme = t === 'dark' ? darkTheme : lightTheme

    return (
        ReactDOM.createPortal(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Paper>
                    <Box className="poz" >

                        <Box className="modal" sx = {{backgroundColor: 'primary.light'}}>
                            <IconButton className="btnZatvori" onClick={props.onClose} disableRipple={true}>
                                <CancelIcon></CancelIcon>
                            </IconButton>
                            <Box className="modal-body">
                                {props.children}
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </ThemeProvider >
            ,
            modalRoot
        )
    )
}

export default Modal