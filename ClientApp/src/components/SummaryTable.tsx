import React, { useContext, useEffect, useState } from 'react'
import { ITableData, ITableHouse, ITablePlant } from '../types/types'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from './Pagination/Pagination';
import EditableCell from './EditableCell';
import { useData } from './MainScreen';
import DatesPanel from './DatesPanel';
import { Context } from './Context';


const Cell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'teal',
            color: theme.palette.common.white,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontSize: 12,
            padding: "8px 5px",
        },
            body: {
            fontSize: 13,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontWeight: 500,
            padding: "8px 5px"
        },
    }),
)(TableCell);

const Row = withStyles((theme: Theme) =>
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
        boxShadow: '(5px 5px 15px rgba(0, 0, 0, 0.25))',
        padding: '0 15px'
    },
});

const getPriceFormat = (price: number) => {
    return price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB' })
}


let PageSize = 30;

export default function SummaryTable(): JSX.Element {

    const { state, dispatch } = useContext(Context);

    const {data} = useData()

    const [currentPage, setCurrentPage] = useState(1);

    const [tableData, setTableData] = useState<ITableData[]>([])

    const [filteredData, setFilteredData] = useState<ITableData[]>([])

    const [slicedTableData, setSlicedTableData] = useState<ITableData[]>([])

    const [isEditMode, setIsEditMode] = useState<{rowId: number | null, cellId: number | null}>({rowId: null, cellId: null})

    const classes = useStyles();

    const updateTableData = (rowId: number, cellId: number, cellKey: string , cellValue: number) => {
        setTableData(old =>
            old.map((row, index) => {
            if (row.id === rowId) {
                return {
                    ...old[index],
                    houses: old[index].houses.map(house => {
                        if (house.consumerId === cellId) {
                            return {
                                ...house,
                                [cellKey]: cellValue
                            }
                        }
                        return house
                    }),
                    plants: old[index].plants.map(plant => {
                        if (plant.consumerId === cellId) {
                            return {
                                ...plant,
                                [cellKey]: cellValue
                            }
                        }
                        return plant
                    })
                }
            }
            return row
            })
        )
        setIsEditMode({rowId: null, cellId: null})
    }


    const onEdit = (row: number, cell: number) => {
        setIsEditMode({rowId: row, cellId: cell})
    }

    useEffect(() => {
        dispatch(tableData)
    }, [tableData, dispatch])

    useEffect(() => {
        state.length !== 0 ?
        setTableData(state) :
        data && setTableData(data)
    }, [data])

    useEffect(() => {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
        setSlicedTableData(filteredData.slice(firstPageIndex, lastPageIndex))
    },[filteredData, currentPage])


    return (
        slicedTableData &&
        <>
        <DatesPanel data={tableData} setFilterData={setFilteredData}/>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <Cell align="center">Дата</Cell>
                        <Cell align="center">Температура воздуха</Cell>
                        {slicedTableData[0]?.plants.map((plant: ITablePlant) => (
                            <Cell key={plant.id}  style={{textAlign: 'right'}}>
                                <p style={{marginRight: 45}}>{plant.name}</p>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <p style={{textAlign: 'right', margin: 0, width: '50%'}}>Показания</p>
                                    <p style={{textAlign: 'right', margin: 0, width: '50%'}}>Цена на кирпич</p>
                                </div>
                            </Cell>
                        ))}
                        {slicedTableData[0]?.houses.map((house: ITableHouse) => (
                            <Cell key={house.id} align="center">{house.name}</Cell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {slicedTableData.map((item) => {
                    const {houses, plants, id, date} = item;
                    return (
                    <Row key={id}>
                        <Cell component="th" scope="row" align="center" style={{width: '135px'}}>
                            {date.toLocaleString('ru-RU', {day: 'numeric', month: 'long'})}
                        </Cell>
                        {houses.length > 0 ?
                            <Cell align="center" style={{width: '60px', cursor: 'pointer'}} onDoubleClick={() => onEdit(id, houses[0].consumerId +10)}>
                                {isEditMode.rowId === id && isEditMode.cellId === houses[0].consumerId+10 ?
                                <EditableCell
                                    rowId={id}
                                    cellId={houses[0].consumerId}
                                    cellKey={'weather'}
                                    cellValue={houses[0].weather}
                                    updateTableData={updateTableData}
                                    setIsEditMode={setIsEditMode}/>
                                : houses[0]?.weather}
                            </Cell> : <Cell align="center">Нет данных</Cell> 
                        }
                        {plants.map((plant: ITablePlant) => (
                            <Cell key={plant.consumerId}>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <div style={{cursor: 'pointer', width: '50%', textAlign: 'right'}} onDoubleClick={() => onEdit(id, plant.consumerId + 80)} >
                                        {isEditMode.rowId === id && isEditMode.cellId === plant.consumerId + 80 ?
                                        <EditableCell
                                            cellValue={plant.consumption}
                                            rowId={id} cellId={plant.consumerId}
                                            cellKey={'consumption'}
                                            updateTableData={updateTableData}
                                            setIsEditMode={setIsEditMode}/>
                                        : plant.consumption.toLocaleString('ru')}
                                    </div>
                                    <div style={{cursor: 'pointer', width: '50%', textAlign: 'right'}} onDoubleClick={() => onEdit(id, plant.consumerId + 90)} >
                                        {isEditMode.rowId === id && isEditMode.cellId === plant.consumerId + 90 ?
                                        <EditableCell
                                            cellValue={plant.price}
                                            rowId={id}
                                            cellId={plant.consumerId}
                                            cellKey={'price'}
                                            updateTableData={updateTableData}
                                            setIsEditMode={setIsEditMode}/>
                                        : getPriceFormat(plant.price)}
                                    </div>
                                </div>
                            </Cell>
                        ))}
                        {houses.map((house: ITableHouse) => (
                            <Cell key={house.consumerId} align="right" style={{cursor: 'pointer'}} onDoubleClick={() => onEdit(id, house.consumerId + 50)}>
                                {isEditMode.rowId === id && isEditMode.cellId === house.consumerId + 50 ?
                                <EditableCell
                                    cellValue={house.consumption}
                                    rowId={id}
                                    cellId={house.consumerId}
                                    cellKey={'consumption'}
                                    updateTableData={updateTableData}
                                    setIsEditMode={setIsEditMode}/>
                                : house.consumption.toLocaleString('ru')}
                            </Cell>
                        ))}
                    </Row>
                )})}
                </TableBody>
            </Table>
        </TableContainer>
        <Pagination
            siblingCount = {1}
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={filteredData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
        />
        </>
    );
        
}
