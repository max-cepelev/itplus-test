import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Spinner } from 'reactstrap'
import { IHouses, IPlants } from '../../types/types';
import LineGraph from '../LineGraph';
import { useData } from '../MainScreen';
import PieGraph from '../PieGraph';


export default function GraphsPage(): React.ReactElement {

    const { data, isLoading } = useData();

    const history = useHistory()

    const [houseGraphData, setHouseGraphData] = useState<{x: number, y: number}[]>([])
    const [plantGraphData, setPlantGraphData] = useState<{x: number, y: number}[]>([])
    const [totalConsumption, setTotalConsumption] = useState<{x: string, y: number}[]>([])

    console.log(totalConsumption);

    useEffect(() => {
        if (data) {

            const housesData: {x: number, y: number}[] = []
            const plantsData: {x: number, y: number}[] = []

            let plantsConsumptionTotal = 0;
            let housesConsumptionTotal = 0;

            data.forEach(date => {
                let housesConsumerSum = 0
                let plantsConsumerSum = 0
                let averagePrice = 0

                date.houses.forEach((house: IHouses) => {
                    housesConsumerSum += house.consumption
                })
                housesData.push({
                    y: date.houses[0]?.weather ? date.houses[0]?.weather : 0,
                    x: Math.round(housesConsumerSum)
                })
                date.plants.forEach((plant: IPlants) => {
                    plantsConsumerSum += plant.consumption
                    averagePrice += plant.price
                })
                plantsData.push({
                    x: Math.round(plantsConsumerSum),
                    y: Math.round(averagePrice/date.plants.length)
                })

                plantsConsumptionTotal += plantsConsumerSum;
                housesConsumptionTotal += housesConsumerSum;
            })

            setHouseGraphData(housesData);
            setPlantGraphData(plantsData);
            setTotalConsumption([{
                x: "Потребление домов",
                y: Math.round(housesConsumptionTotal)
            },
            {
                x: "Потребление заводов",
                y: Math.round(plantsConsumptionTotal),
            }
        ])
        }
    }, [data])



    if (isLoading) return <Spinner/>

    if (houseGraphData && houseGraphData.length !== 0) {
        return (
            <>
            <Button onClick={() => history.push('/')} variant="contained" color="primary">Назад</Button>
            <LineGraph data={houseGraphData} text='Температура' color="#FFB830" graphLabel='Зависимость потребления домов от температуры'/>
            <LineGraph data={plantGraphData} text='Цена на кирпич' color="#FF2442" graphLabel='Зависимость потребления заводов от цены на кирпич'/>
            <PieGraph data={totalConsumption}/>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
}
