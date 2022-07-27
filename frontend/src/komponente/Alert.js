
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';

const Greska = (props) => {

    return (<Modal
        sx={{ display: 'flex', justifyContent: 'center' }}
        open={props.open}
        onClose={props.onClose}
    >
        <Alert
            severity={props.tip}
            sx={{
                height: 100,
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center'
            }}

        >{props.greska} ):</Alert>
    </Modal>)
}
export default Greska