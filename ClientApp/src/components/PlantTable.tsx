import React from 'react'
import { useParams } from 'react-router'
import { ITableData } from '../types/types'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useData } from './MainScreen';
import { Spinner } from 'reactstrap';


interface Props {
    data: ITableData[]
}

interface ItemPageParams {
    id: string;
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
                backgroundColor: '#ffffff',
            },
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 400,
        maxWidth: 1200,
        margin: '30px auto',
        backgroundColor: '#e3e3e3',
    },
});

export default function PlantTable({data}: Props): JSX.Element {

    const params = useParams<ItemPageParams>();

    const id = parseInt(params.id) - 1;

    const classes = useStyles();

    if (data) {
        return (
            <TableContainer component={Paper}>
                <h4 style={{textAlign: 'center', marginTop: '30px'}}>{data[0]?.plants[id].name}</h4>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Дата</StyledTableCell>
                            <StyledTableCell align="center">Показания</StyledTableCell>
                            <StyledTableCell align="center">Цена на кирпич</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => {
                        const plants = item.plants;
                        return (
                        <StyledTableRow key={item.id}>
                            <StyledTableCell component="th" scope="row">
                                {new Date(item.date).toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}
                            </StyledTableCell>
                            <StyledTableCell align="center">{plants[id]?.consumption.toLocaleString('ru-RU')}</StyledTableCell>
                            <StyledTableCell align="center">{plants[id]?.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB' })}</StyledTableCell>
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
