import { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserContext } from '../../context/UserContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import useAxiosPrivate from '../../api/useAxiosPrivate';
import { useRadioGroup, FormControlLabel, Paper, IconButton, FormControl, Grid, Radio, RadioGroup, Button } from '@mui/material';
import { Input, InputAdornment } from '@mui/material';

export default function Tabela(props) {

    const axiosPrivate = useAxiosPrivate()

    let buttonSelected = ''

    const { user } = useContext(UserContext);

    const [korisnici, setKorisnici] = useState([])
    const [greska, setGreska] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [nizUsluga, setUsluge] = useState([])
    const [nalog, setNalog] = useState('')


    useEffect(() => {

        const getKorisnici = async (url) => {
            await axiosPrivate.get(url).then(p => {
                if (p.status === 200) {
                    p.data.sort((a, b) => new Date(a.clanarinaDo) - new Date(b.clanarinaDo));

                    setKorisnici(p.data)
                    setRows(p.data)
                }
            }).catch((error) => {
                alert('Doslo je do greske')
                console.log('greska prilkom ucitavanja korisnika: ' + error)
            });
        }

        if (props.verifikovan) {
            getKorisnici("http://localhost:8800/api/korisnik/vratiVerifikovaneNaloge")
        }
        else {
            getKorisnici("http://localhost:8800/api/korisnik/vratiNeverifikovaneNaloge")
        }

    }, [refresh])

    useEffect(() => {

        const get = async () => {
            await axiosPrivate.get("http://localhost:8800/api/usluga/vidiUsluge").then(p => {
                if (p.status === 200) {
                    setUsluge(p.data)
                }
            }).catch((error) => {
                alert('Doslo je do greske')
                console.log(error)
            });
        }
        get()

    }, [])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - korisnici.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [rows, setRows] = useState(korisnici)
    const [searchName, setSearchName] = useState("");
    const [searchBroj, setSearchBroj] = useState("");

    const [napredak, setNapredak] = useState(false);

    const searchByName = (ev) => {
        const filteredRows = korisnici.filter((row) => {
            return (row.ime + ' ' + row.prezime).toLowerCase().includes(ev.target.value.toLowerCase());
        });
        setRows(filteredRows)
        setSearchName(ev.target.value);
    }

    const searchByBroj = (ev) => {

        const filteredRows = korisnici.filter((row) => {
            return row.email.toString().includes(ev.target.value.toLowerCase());
        })

        setRows(filteredRows)
        setSearchBroj(ev.target.value);
    }

    const obrisiKorisnika = async (id) => {
        console.log(id)
        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/obrisiKorisnika/' + user.id,
            body: {
                korisnikId: id
            }
        }

        try {
            await axiosPrivate.delete('http://localhost:8800/api/korisnik/obrisiKorisnika/' + user.id + '?korisnikId=' + id)
            alert('Uspesno ste izbrisali korisnika')
        }
        catch (err) {
            alert('Doslo je do greske')
        }

        setRefresh(!refresh)
    }

    const unesiClanarinu = async (idKorisnika) => {

        const zahtev = {
            url: 'http://localhost:8800/api/clanarina/dodajClanarinu/' + idKorisnika + '/' + buttonSelected
        }

        try {
            const res = await axiosPrivate.put(zahtev.url)
            setRefresh(!refresh)
        }
        catch (err) {
            alert('Doslo je do greske')
        }
    }

    const verifikujNalog = async (id) => {

        const zahtev = {
            url: 'http://localhost:8800/api/korisnik/verifikujNalog/' + id
        }

        try {
            const res = await axiosPrivate.put(zahtev.url)
            alert('Uspesno verifikovan nalog')
            setRefresh(!refresh)
        }
        catch (err) {
            alert('Doslo je do greske')
        }
    }

    const handleRadioChange = (ev) => {
        ev.preventDefault();

        buttonSelected = ev.target.value;
    }

    const RadioButtons = (props) => {

        return (
            <RadioGroup sx={{ display: 'flex', alignItems: 'center', padding: '2%' }}>
                <Grid container >

                    {nizUsluga.map((usl) => (
                        <Grid item xs={6} sm={6} md={4} key={usl._id}>
                            <FormControlLabel
                                sx={{ justifyContent: 'center', width: '100%' }}
                                key={usl._id}
                                value={usl._id}
                                control={<Radio />}
                                onChange={handleRadioChange}
                                label={usl.naziv} />
                        </Grid>

                    ))}
                </Grid>

                <Button
                    sx={{ mt: '1%' }}
                    size="small"
                    variant="contained"
                    onClick={() => unesiClanarinu(props.idKorisnika)}
                >
                    Uplati clanarinu
                </Button>
            </RadioGroup >

        )
    }

    const Red = ({ row }) => {

        const [open, setOpen] = useState(false);

        return (
            <Fragment>
                < TableRow >
                    {props.verifikovan && <TableCell>
                        <IconButton

                            size="small"
                            onClick={() => { setOpen(!open) }}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>}

                    <TableCell component="th" scope="row">
                        {row.ime + ' ' + row.prezime}
                    </TableCell>

                    <TableCell align="left">
                        {row.email}
                    </TableCell>

                    {
                        props.verifikovan &&
                        <TableCell
                            style={{ color: new Date() > new Date(row.clanarinaDo) ? 'red' : 'inherit' }}
                            align="left">

                            {row.clanarinaDo}
                        </TableCell>

                    }

                    {
                        !props.verifikovan && <TableCell align="left">
                            <Button
                                onClick={() => verifikujNalog(row.id)}
                                size="medium"
                                variant="text">
                                Verifikuj
                            </Button>
                        </TableCell>
                    }

                    <TableCell align="left">
                        <Button
                            onClick={() => obrisiKorisnika(row.id)}
                            size="medium"
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}>
                            Obrisi
                        </Button>
                    </TableCell>
                </TableRow>
                {
                    props.verifikovan
                    &&
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <RadioButtons idKorisnika={row.id} />
                            </Collapse>
                        </TableCell>
                    </TableRow>
                }
            </Fragment>)
    }

    return (
        <Paper>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <FormControl sx={{ m: '2%' }}>
                    <Input
                        placeholder="Ime"
                        value={searchName}
                        onChange={searchByName}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl sx={{ m: '2%' }}>
                    <Input
                        placeholder="E-mail"
                        value={searchBroj}
                        onChange={searchByBroj}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {props.verifikovan &&
                                <TableCell></TableCell>
                            }
                            <TableCell sx={{ 'textAlign': 'left' }}>
                                Ime prezime
                            </TableCell>

                            <TableCell sx={{ 'textAlign': 'left' }}>
                                E-mail
                            </TableCell>
                            {props.verifikovan && <TableCell sx={{ 'textAlign': 'left' }}>
                                Datum isteka clanarine
                            </TableCell>}
                            <TableCell></TableCell>
                            {!props.verifikovan &&
                                <TableCell></TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <Red key={row.email} row={row} />
                            ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>

                            <TablePagination
                                sx={{ overflow: 'revert' }}
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper >
    )
}
