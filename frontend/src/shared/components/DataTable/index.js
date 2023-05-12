import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import { Typography } from '@mui/material';

//import TableToolbar from './TableToolbar';
import TableHead from './TableHead';
import TableMoreMenu from './TableMoreMenu';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11).
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        
        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });
    
    return stabilizedThis.map((el) => el[0]);
}

function DataTable({ rows, rowsPerPage }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
  
    function handleRequestSort(event, property) {
        const isAsc = orderBy === property && order === 'asc';

        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }
  
    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);

            return;
        }

        setSelected([]);
    }
  
    function handleClick(event, name) {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
  
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
  
        setSelected(newSelected);
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function pageResultsMessage() {
        const rowsPage = page - 1;
        const start = rowsPage * rowsPerPage + 1;
        var end = rowsPage * rowsPerPage + rowsPerPage;
        end = (end > rows.length) ? rows.length : end;
        
        return `Showing results ${start} to ${end} of ${rows.length}`
    }
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    // "Filas fantasma" a agregar para evitar un cambio de layout al 
    // llegar a la última página. La idea es que la tabla siempre tenga
    // el mismo alto sin importar el número de filas que esté mostrando.
    const emptyRows = page > 0 ? Math.max(0, page * rowsPerPage - rows.length) : 0;
  
    const visibleRows = useMemo(function () {
        // El número de página empieza en 1, pero el array de filas en 0, por lo que
        // al hacer el cálculo de la página, hay que empezar contando desde 0.
        const rowsPage = page - 1;

        return stableSort(rows, getComparator(order, orderBy)).slice(
            rowsPage * rowsPerPage,
            rowsPage * rowsPerPage + rowsPerPage,
        );
    }, [order, orderBy, page, rows, rowsPerPage]);
  
    return (
        <Box sx={{ width: '100%', p: 1.5 }}>
            {/*<TableToolbar numSelected={selected.length} />*/}
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                >
                    <TableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;
        
                            return (
                                <TableRow
                                    hover                                    
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            checked={isItemSelected}
                                            onClick={(event) => handleClick(event, row.name)}
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                    <TableCell align="right" sx={{ py: 0 }}><TableMoreMenu /></TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                height: 53 * emptyRows,
                                }}
                            >
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: 3
                }}
            >
                <Typography variant="body2">
                    {pageResultsMessage()}
                </Typography>
                <Pagination
                    count={Math.ceil(rows.length / rowsPerPage)}
                    color="primary"
                    page={page}
                    onChange={handleChangePage}                    
                />
            </Box>            
        </Box>
    );
}

export default DataTable;