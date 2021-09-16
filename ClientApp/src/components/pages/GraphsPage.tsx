import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Spinner } from 'reactstrap'
import { IHouses, IPlants, ITableData } from '../../types/types';
import AreaGraph from '../AreaGraph';
import LineGraph from '../LineGraph';
import { useData } from '../MainScreen';
import PieGraph from '../PieGraph';


export default function GraphsPage(): React.ReactElement {

    const { data, isLoading } = useData();

    const history = useHistory()

    const [houseScatterGraphData, setHouseScatterGraphData] = useState<{x: number, y: number}[]>([])
    const [plantScatterGraphData, setPlantScatterGraphData] = useState<{x: number, y: number}[]>([])
    const [areaGraphData, setAreaGraphData] = useState<{houses: {x: Date, y: number}[], plants: {x: Date, y: number}[], total: {x: Date, y: number}[]}>()



    console.log(houseScatterGraphData);
    console.log(plantScatterGraphData);
    console.log(areaGraphData);

    useEffect(() => {
        if (data) {

            const housesData: {x: number, y: number}[] = []
            const housesAreaGraphData: {x: Date, y: number}[] = []
            const plantsData: {x: number, y: number}[] = []
            const plantsAreaGraphData: {x: Date, y: number}[] = []
            const totalAreaGraphData: {x: Date, y: number}[] = []



            data.forEach((day: ITableData) => {
                let housesConsumerSum = 0
                let plantsConsumerSum = 0
                let averagePrice = 0

                day.houses.forEach((house: IHouses) => {
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
                day.plants.forEach((plant: IPlants) => {
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
    }, [data])



    if (isLoading) return <Spinner/>

    if (houseScatterGraphData && plantScatterGraphData.length !== 0) {
        return (
            <>
            <Button onClick={() => history.push('/')} variant="contained" color="primary">Назад</Button>
            <LineGraph data={houseScatterGraphData} text='Температура' color="#FFB830" graphLabel='Зависимость потребления домов от температуры'/>
            <LineGraph data={plantScatterGraphData} text='Цена на кирпич' color="#FF2442" graphLabel='Зависимость потребления заводов от цены на кирпич'/>
            <AreaGraph data={areaGraphData}/>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
}
