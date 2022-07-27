import { useState, Fragment, } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { FormControl, InputAdornment, Input, Paper } from '@mui/material';


function TablePaginationActions(props) {

    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };


    return (
        <Box sx={{ flexShrink: 0 }}>

            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>

        </Box>
    );
}

const Red = (props) => {
    const { row, rowNames } = props
    const navigate = useNavigate()

    const velikiBlog = (blog) => {
        if (row.tagovi) {
            //  navigate(`/blog/${row.tagovi}/${row.naslov}`, { state: row }, { replace: false });
            let handle = window.open(`/blog/${row.tagovi}/${row.naslov}`);
            handle.window.parameters = JSON.stringify(row);
        }
    }

    return (
        <Fragment>
            <TableRow >
                {rowNames?.map((name, i) => (
                    <TableCell key={i} onClick={velikiBlog}>
                        {row[name]}
                    </TableCell>
                ))}

                <TableCell style={{ width: 160 }} align="right">
                    <Button
                        onClick={props.onDelete}
                        size="medium"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}>
                        Obrisi
                    </Button>
                </TableCell>
            </TableRow>

        </Fragment>
    )
}

const TabelaZaReciklazu = (props) => {
    const { head, rows, rowName } = props
    //  console.log(props)


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);

    const [red, setRows] = useState(props.rows)
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const trazi1 = (ev) => {
        const filteredRows = rows.filter((row) => {
            return row[props.search1]?.toLowerCase().includes(ev.target.value.toLowerCase());
        })
        setPage(0);
        setRows(filteredRows)
        setSearch1(ev.target.value);
    }

    const trazi2 = (ev) => {

        const filteredRows = rows.filter((row) => {
            return row[props.search2]?.toLowerCase().includes(ev.target.value.toLowerCase());
        });
        setPage(0);
        setRows(filteredRows)
        setSearch2(ev.target.value);
    }

    const cancelSearch = () => {
        setSearch1("");
        setSearch2('')
        setRows(props.rows)
    };

    return (
        <Paper>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <FormControl sx={{ m: '2%' }}>
                    <Input
                        placeholder={props.search1}
                        value={search1}
                        onChange={trazi1}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl sx={{ m: '2%' }}>
                    <Input
                        placeholder={props.search2}
                        value={search2}
                        onChange={trazi2}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

            </Box>

            <TableContainer sx={{ alignSelf: 'center' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {head?.map((head, i) => (
                                <TableCell key={i}>{head}</TableCell>
                            ))}
                            <TableCell />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {(rowsPerPage > 0
                            ? red.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : red
                        ).map((row, i) => (
                            <Red key={i} row={row} rowNames={rowName} onDelete={() => props.onDelete(row.id)} />
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
                                rowsPerPageOptions={[7, 14, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={red.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    )

}
export default TabelaZaReciklazu