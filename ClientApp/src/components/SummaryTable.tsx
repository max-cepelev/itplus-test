import React, { useEffect, useState } from 'react'
import { ITableData } from '../types/types'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Input } from '@material-ui/core';
import DoneIcon from "@material-ui/icons/Check";

interface Props {
    data: ITableData[] | undefined;
}

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: '#bbb0e8',
            color: theme.palette.common.black,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontSize: 12,
        },
            body: {
            fontSize: 12,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontWeight: 500,
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
        boxShadow: '(5px 5px 15px rgba(0, 0, 0, 0.25))'
    },
});

export default function SummaryTable({data}: Props): JSX.Element {

    const [tableData, setTableData] = useState<any[]>([])

    const [editMode, setEditMode] = useState({plantId: 0, houseId: 0, cellID: 0})


    const onEdit = (id: any, cellId: number, consumer: string) => {

        consumer === 'plant' && setEditMode({houseId: 0 ,plantId: id, cellID: cellId})
        consumer === 'house' && setEditMode({houseId: id ,plantId: 0, cellID: cellId})
    }

    const onSave = () => {
        setEditMode({plantId: 0, houseId: 0, cellID: 0})
    }

    const handleChange = (e: any, row: number, consumerId: number) => {
        
        const {value, name} = e.target;

    }

    const classes = useStyles();

    useEffect(() => {
        data && setTableData(data)
    }, [data])

    if (tableData) {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Дата</StyledTableCell>
                            <StyledTableCell align="center">Температура воздуха</StyledTableCell>
                            {tableData[0]?.plants.map((plant: any) => (
                                <StyledTableCell key={plant.id} align="center">{plant.name}<br />(Цена на кирпич)</StyledTableCell>
                            ))}
                            {tableData[0]?.houses.map((house: any) => (
                                <StyledTableCell key={house.id} align="center">{house.name}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((item) => {
                        const {houses, plants, id, date} = item;
                        return (
                        <StyledTableRow key={id}>
                            <StyledTableCell component="th" scope="row" style={{width: '145px'}}>
                                {date.toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}
                            </StyledTableCell>
                            <StyledTableCell align="center" style={{width: '60px'}}>{houses.length > 0 ? houses[0]?.weather : 'нет данных'}</StyledTableCell>
                            {plants.map((plant: any) => (
                                <StyledTableCell key={plant.id} align="center" onDoubleClick={() => onEdit(plant.id, id, 'plant')} style={{cursor: 'pointer'}}>
                                    {editMode.cellID === id && editMode.plantId === plant.id ? 
                                        <>
                                        <Input
                                            value={plant.consumption}
                                            name='consumption'
                                        />
                                        <DoneIcon onClick={onSave}/>
                                        </>
                                    : `${plant.consumption.toFixed(2)} (${plant.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB' })})`}
                                    
                                </StyledTableCell>
                            ))}
                            {houses.map((house: any) => (
                                <StyledTableCell key={house.id} align="center" onDoubleClick={() => onEdit(house.id, id, 'house')} style={{cursor: 'pointer'}}>
                                    {editMode.cellID === id && editMode.houseId === house.id ? 
                                        <>
                                        <Input
                                            value={house.consumption}
                                            name='consumption'
                                            onChange={(e) => handleChange(e, id, house.id)}
                                        />
                                        <DoneIcon onClick={onSave}/>
                                        </>
                                    : house.consumption.toFixed(2)}
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
        <h4>Нет данных</h4>
    )
        
}
