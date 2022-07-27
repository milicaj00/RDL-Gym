
import { FormControl, InputLabel, MenuItem, Select, FormControlLabel } from '@mui/material';


const DropDown = ({ labela, set, niz, value }) => {
    return (<FormControl>
        <InputLabel size = "small">{labela}</InputLabel>
        <Select
            label={labela}
            value={value}
            size='small'
            onChange={(ev) => {
                set(ev.target.value)
            }}
        >
            {
                niz.map(n => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                ))
            }

        </Select>
    </FormControl>)
}
export default DropDown