import React, { useContext, useEffect, useState } from 'react'
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
import Pagination from './Pagination/Pagination'
import Spinner from './Spinner/Spinner'
import EditableCell from './EditableCell';
import DatesPanel from './DatesPanel';
import { Context } from './Context';
import { useData } from './MainScreen';


interface Props {
    house: boolean
    plant: boolean
}

interface ItemPageParams {
    id: string;
}

const Cell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: 'teal',
            color: theme.palette.common.white,
            fontFamily: "'Montserrat Alternates', sans-serif"
        },
            body: {
            fontSize: 14,
            fontFamily: "'Montserrat Alternates', sans-serif",
            fontWeight: 500
        },
    }),
)(TableCell);

const Row = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#e3e3e3',
            },
            maxWidth: 1080
        },
    }),
)(TableRow);


const useStyles = makeStyles({
    table: {
        boxShadow: '(5px 5px 15px rgba(0, 0, 0, 0.25))'
    },
});

let PageSize = 30;

export default function ConsumerTable({house, plant}: Props): JSX.Element {

    const { state, dispatch } = useContext(Context);

    const {data} = useData()

    const [tableData, setTableData] = useState<ITableData[]>(state)

    const [currentPage, setCurrentPage] = useState(1);

    const [filteredData, setFilteredData] = useState<ITableData[]>([])

    const [slicedTableData, setSlicedTableData] = useState<ITableData[]>([])

    const [isEditMode, setIsEditMode] = useState<{rowId: number | null, cellId: number | null}>({rowId: null, cellId: null})

    const params = useParams<ItemPageParams>();

    const id = parseInt(params.id) - 1;

    const classes = useStyles();

    const updateTableData = (rowId: number, cellId: number, cellKey: string , cellValue: number) => {
        setTableData(old =>
            old.map((row, index) => {
                if (row.id === rowId) {
                    if (house) {
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
                            })
                        }
                    }
                    if (plant) {
                        return {
                            ...old[index],
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
                }
                    return row
                })
        )
        setIsEditMode({rowId: null, cellId: null})
    }

    const onEdit = (row: number, cellId: number) => {
        setIsEditMode({rowId: row, cellId: cellId})
    }

    useEffect(() => {
        dispatch(tableData)
    }, [tableData, dispatch])

    useEffect(() => {
        state.length === 0 && data && setTableData(data)
}, [data, state])

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setSlicedTableData(filteredData.slice(firstPageIndex, lastPageIndex))
    },[filteredData, currentPage])


    if (slicedTableData) {
        return (
            slicedTableData &&
            <>
            <h4 style={{textAlign: 'center', margin: '30px auto'}}>
                {house && slicedTableData[0]?.houses[id].name}
                {plant && slicedTableData[0]?.plants[id].name}
            </h4>
            <DatesPanel data={tableData} setFilterData={setFilteredData}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <Cell>Дата</Cell>
                            <Cell align="center">Показания</Cell>
                            {house && <Cell align="center">Температура воздуха</Cell>}
                            {plant && <Cell align="center">Цена на кирпич</Cell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {slicedTableData.map((item) => {
                        const {houses, plants} = item;
                        const rowId = item.id
                        return (
                        <Row key={item.id}>
                            <Cell component="th" scope="row">
                                {new Date(item.date).toLocaleString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}
                            </Cell>
                            {house &&
                                <>
                                {houses.length > 0 ? 
                                    <Cell align="center" style={{cursor: 'pointer'}} onDoubleClick={() => onEdit(rowId, houses[id].consumerId + 10)}>
                                        {isEditMode.rowId === rowId && isEditMode.cellId === houses[id].consumerId + 10 ?
                                        <EditableCell
                                            rowId={rowId}
                                            cellKey={'consumption'}
                                            cellId={houses[id].consumerId}
                                            cellValue={houses[id].consumption}
                                            updateTableData={updateTableData}
                                            setIsEditMode={setIsEditMode}/>
                                        : houses[id]?.consumption.toLocaleString('ru-RU')}
                                    </Cell>
                                    : <Cell align="center">Нет данных</Cell>
                                }
                                {houses.length > 0 ?
                                    <Cell align="center" style={{cursor: 'pointer'}} onDoubleClick={() => onEdit(rowId, houses[id].consumerId + 20)}>
                                        {isEditMode.rowId === rowId && isEditMode.cellId === houses[id].consumerId + 20 ?
                                        <EditableCell
                                            rowId={rowId}
                                            cellKey={'weather'}
                                            cellId={houses[id].consumerId}
                                            cellValue={houses[id].weather}
                                            updateTableData={updateTableData}
                                            setIsEditMode={setIsEditMode}/>
                                        : houses[id]?.weather}
                                    </Cell> : <Cell align="center">Нет данных</Cell>
                                }
                                </>
                            }
                            {plant &&
                                <>
                                <Cell align="center" style={{cursor: 'pointer'}} onDoubleClick={() => onEdit(rowId, plants[id].consumerId + 30)}>
                                    {isEditMode.rowId === rowId && isEditMode.cellId === plants[id].consumerId + 30 ?
                                    <EditableCell
                                        rowId={rowId}
                                        cellKey={'consumption'}
                                        cellId={plants[id].consumerId}
                                        cellValue={plants[id].consumption}
                                        updateTableData={updateTableData}
                                        setIsEditMode={setIsEditMode}/>
                                    : plants[id]?.consumption.toLocaleString('ru-RU')}
                                </Cell>
                                <Cell align="center" style={{cursor: 'pointer'}} onDoubleClick={() => onEdit(rowId, plants[id].consumerId + 40)}>
                                    {isEditMode.rowId === rowId && isEditMode.cellId === plants[id].consumerId + 40 ?
                                    <EditableCell
                                        rowId={rowId}
                                        cellKey={'price'}
                                        cellId={plants[id].consumerId}
                                        cellValue={plants[id].price}
                                        updateTableData={updateTableData}
                                        setIsEditMode={setIsEditMode}/>
                                    : plants[id]?.price.toLocaleString('ru-RU', {style: 'currency', currency: 'RUB' })}
                                </Cell>
                                </>
                            }
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

    return (
        <Spinner/>
    )

}
