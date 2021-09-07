import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Spinner } from 'reactstrap'
import LineGraph from './LineGraph'
import { useData } from './MainScreen';


export default function GraphsPage(): React.ReactElement {

    const { data, isLoading } = useData();

    const history = useHistory()

    const [houseGraphData, setHouseGraphData] = useState([])
    const [plantGraphData, setPlantGraphData] = useState([])

    useEffect(() => {
        if (data) {

            const housesData: any = []
            const plantsData: any = []

            data.forEach(date => {
                let housesConsumerSum = 0
                let plantsConsumerSum = 0
                let averagePrice = 0
                date.houses.forEach((house: any) => {
                    housesConsumerSum += house.consumption
                })
                housesData.push({
                    y: date.houses[0]?.weather ? date.houses[0]?.weather : 0,
                    x: Math.round(housesConsumerSum)
                })
                date.plants.forEach((plant: any) => {
                    plantsConsumerSum += plant.consumption
                    averagePrice += plant.price
                })
                plantsData.push({
                    x: Math.round(plantsConsumerSum),
                    y: Math.round(averagePrice/date.plants.length)
                })
            })

            setHouseGraphData(housesData);
            setPlantGraphData(plantsData)
        }
    }, [data])

    if (isLoading) return <Spinner/>

    if (houseGraphData && houseGraphData.length !== 0) {
        return (
            <>
            <Button onClick={() => history.push('/')} variant="contained" color="primary">Назад</Button>
            <LineGraph data={houseGraphData} text='Температура' color="#FFB830" grapfLabel='Зависимость потребления домов от температуры'/>
            <LineGraph data={plantGraphData} text='Цена на кирпич' color="#FF2442" grapfLabel='Зависимость потребления заводов от цены на кирпич'/>
            </>
        )
    } else {
        return (
            <Spinner/>
        )
    }
}
