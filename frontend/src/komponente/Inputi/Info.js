import { TextField } from "@mui/material";
import { Fragment } from "react";


const Info = (props) => {
    const { labela, tip, reff, err, tekst } = props
    return (
        <Fragment>
            <TextField
                error={err}
                inputRef={reff}
                label={labela}
                type={tip}
                color="primary"
                size="small"
                placeholder={tekst}
                // helperText={tekst}
                {...props}
                />
        </Fragment>
    )
}


export default Info;