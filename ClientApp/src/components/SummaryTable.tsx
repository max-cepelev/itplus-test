import React from 'react'
import { ITableData } from '../types/types'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Spinner } from 'reactstrap';

interface Props {
    data: ITableData[] | undefined;
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#bbb0e8',
            color: theme.palette.common.black,
            fontFamily: "'Montserrat Alternates', sans-serif",
        },
            body: {
            fontSize: 14,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontWeight: 500
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#e3e3e3',
            },
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 400,
    },
});

export default function HouseTablePage({data}: Props): JSX.Element {

    const classes = useStyles();

    if (data) {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Дата</StyledTableCell>
                            <StyledTableCell align="center">Температура воздуха</StyledTableCell>
                            {data[0]?.houses.map(house => (
                                <StyledTableCell key={house.id} align="center">{house.name}</StyledTableCell>
                            ))}
                            {data[0]?.plants.map(plant => (
                                <StyledTableCell key={plant.id} align="center">{`${plant.name} (Цена на кирпич)`}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => {
                        const {houses, plants, id, date} = item;
                        return (
                        <StyledTableRow key={id}>
                            <StyledTableCell component="th" scope="row" style={{width: '40px'}}>
                                {new Date(date).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{width: '60px'}}>{houses[0]?.weather}</StyledTableCell>
                            {houses.map(house => (
                                <StyledTableCell key={house.id} align="center">{house.consumption.toFixed(2)}</StyledTableCell>
                            ))}
                            {plants.map(plant => (
                                <StyledTableCell key={plant.id} align="center">
                                    {`${plant.consumption.toFixed(2)} (${plant.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB' })})`}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    )})}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        <Spinner/>
    )
        
}
