import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Spinner from '../Spinner/Spinner'
import {Button} from '@material-ui/core'
import { ITableHouse, ITablePlant, ITableData } from '../../types/types';
import AreaGraph from '../AreaGraph';
import LineGraph from '../LineGraph';
import { useData } from '../MainScreen';
import { Context } from '../Context';


export default function GraphsPage(): React.ReactElement {

    const { state } = useContext(Context);

    const [graphData, setGraphData] = useState<ITableData[]>(state)

    const { data } = useData();

    const history = useHistory()

    const [houseScatterGraphData, setHouseScatterGraphData] = useState<{x: number, y: number}[]>([])
    const [plantScatterGraphData, setPlantScatterGraphData] = useState<{x: number, y: number}[]>([])
    const [areaGraphData, setAreaGraphData] = useState<{houses: {x: Date, y: number}[], plants: {x: Date, y: number}[], total: {x: Date, y: number}[]}>()

    useEffect(() => {
            state.length === 0 && data && setGraphData(data)
    }, [data, state])

    useEffect(() => {
        if (graphData.length !== 0) {

            const housesData: {x: number, y: number}[] = []
            const housesAreaGraphData: {x: Date, y: number}[] = []
            const plantsData: {x: number, y: number}[] = []
            const plantsAreaGraphData: {x: Date, y: number}[] = []
            const totalAreaGraphData: {x: Date, y: number}[] = []

            graphData.forEach((day: ITableData) => {
                let housesConsumerSum = 0
                let plantsConsumerSum = 0
                let averagePrice = 0

                day.houses.forEach((house: ITableHouse) => {
                    housesConsumerSum += house.consumption
                })
                housesData.push({
                    y: day.houses[0]?.weather ? day.houses[0]?.weather : 0,
                    x: Math.round(housesConsumerSum),
                })
                housesAreaGraphData.push({
                    x: day.date,
                    y: Math.round(housesConsumerSum) * 10
                })
                day.plants.forEach((plant: ITablePlant) => {
                    plantsConsumerSum += plant.consumption
                    averagePrice += plant.price
                })
                plantsData.push({
                    x: Math.round(plantsConsumerSum),
                    y: Math.round(averagePrice/day.plants.length),
                })
                plantsAreaGraphData.push({
                    x: day.date,
                    y: Math.round(plantsConsumerSum)
                })
                totalAreaGraphData.push({
                    x: day.date,
                    y: (housesConsumerSum * 10) + plantsConsumerSum
                })
            })

            setHouseScatterGraphData(housesData);
            setPlantScatterGraphData(plantsData);
            setAreaGraphData({
                houses: housesAreaGraphData,
                plants: plantsAreaGraphData,
                total: totalAreaGraphData
            })
            
        }
    }, [graphData])


    if (houseScatterGraphData && plantScatterGraphData.length !== 0) {
        return (
            <>
            <Button onClick={() => history.push('/')} variant="contained" color="primary">Назад</Button>
            <LineGraph data={houseScatterGraphData} text='Температура' color="#FFB344" graphLabel='Зависимость потребления домов от температуры'/>
            <LineGraph data={plantScatterGraphData} text='Цена на кирпич' color="#2D46B9" graphLabel='Зависимость потребления заводов от цены на кирпич'/>
            <AreaGraph data={areaGraphData}/>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
}
