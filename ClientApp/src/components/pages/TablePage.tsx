import React, { useState } from 'react'
import { ITableData } from '../../types/types';
import ConsumersNavigation from '../ConsumersNavigation/ConsumersNavigation';
import SearchPanel from '../SearchPanel'
import SummaryTable from '../SummaryTable';

export default function TablePage() {

    const [filterData, setFilterData] = useState<ITableData[]>([])

    return (
        <>
            <ConsumersNavigation/>
            <SearchPanel setFilterData={setFilterData}/>
            <SummaryTable data={filterData}/>
        </>
    )
}
