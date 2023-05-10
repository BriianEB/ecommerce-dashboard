import { Box, Checkbox, TableCell, TableHead as MUITableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';


const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dessert (100g serving)',
    },
    {
      id: 'calories',
      numeric: true,
      disablePadding: false,
      label: 'Calories',
    },
    {
      id: 'fat',
      numeric: true,
      disablePadding: false,
      label: 'Fat (g)',
    },
    {
      id: 'carbs',
      numeric: true,
      disablePadding: false,
      label: 'Carbs (g)',
    },
    {
      id: 'protein',
      numeric: true,
      disablePadding: false,
      label: 'Protein (g)',
    },
];

function TableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
        <MUITableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </MUITableHead>
    );
}

export default TableHead;