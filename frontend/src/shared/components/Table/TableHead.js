import { Box, Checkbox, TableCell, TableHead as MUITableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function TableHead(props) {
    const { columns, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    function handleCreateSort(event, property) {
        onRequestSort(event, property);
    }
  
    return (
        <MUITableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        size="small"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all',
                        }}                        
                    />
                </TableCell>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.numeric ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                        sx={{
                            bgcolor: (theme) => orderBy === column.id ? theme.palette.grey[300] : ''
                        }}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={(event) => handleCreateSort(event, column.id)}
                            IconComponent={KeyboardArrowDownIcon}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell></TableCell>
            </TableRow>
        </MUITableHead>
    );
}

export default TableHead;