import React, { useState } from 'react'
import { Button } from 'reactstrap';
import { ITableData } from '../../types/types';
import { useHistory } from 'react-router';
import SearchPanel from '../SearchPanel';
import ConsumerTable from '../ConsumerTable';

interface Props {
    house: boolean
    plant: boolean
}


export default function ConsumerPage({house, plant}: Props): JSX.Element {

    const history = useHistory()

    const [filterData, setFilterData] = useState<ITableData[]>([])


    return (
        <>
        <Button onClick={() => history.push('/table')} variant="contained" color="primary">Назад</Button>
        <SearchPanel setFilterData={setFilterData}/>
        <ConsumerTable data={filterData} house={house} plant={plant}/>
        </>
    )
}
