import axios from 'axios';
import React, { useReducer } from 'react'
import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IData, IHouse, IHouseConsumptions, IPlant, IPlantsConsumptions, ITableData } from '../types/types'
import ConsumerPage from './pages/ConsumerPage';
import GraphsPage from './pages/GraphsPage';
import Menu from './Menu/Menu';
import TablePage from './pages/TablePage';
import { Context } from './Context';

const dataTransformation = (data: IData) => {
    
    const tempData: ITableData[] = []

    data.plants[0].consumptions.forEach((item: IPlantsConsumptions, id) => {
        tempData.push(
            {   
                id: id,
                date: new Date(item.Date),
                houses: [],
                plants: []
            })
    })
    
    data.houses.forEach((house: IHouse) => {
        tempData.forEach(item => {
            item.houses.push(
                ...house.consumptions
                .filter((consumption: IHouseConsumptions) => new Date(consumption.Date).valueOf() === item.date.valueOf())
                .map((consumption: IHouseConsumptions) => (
                    {   
                        id: house.ConsumerId,
                        consumerId: house.ConsumerId,
                        name: house.Name,
                        consumption: consumption.Consumption,
                        weather: consumption.Weather,
                    }
                ))
            )
        })
    })

    data.plants.forEach((plant: IPlant, id) => {
        tempData.forEach(item => {
            item.plants.push(
                ...plant.consumptions
                .filter((consumption: IPlantsConsumptions) => new Date(consumption.Date).valueOf() === item.date.valueOf())
                .map((consumption: IPlantsConsumptions) => (
                    {   
                        id: id + 1,
                        consumerId: plant.ConsumerId,
                        name: plant.Name,
                        consumption: consumption.Consumption,
                        price: consumption.Price,
                    }
                ))
        )})
    })

    return tempData;
}

export function useData() {
    return useQuery("data", async () => {
        const { data } = await axios.get<IData>(
            '/api/Data'
        );
        return dataTransformation(data)
    }, {staleTime: 300000});
}


export default function MainScreen(): ReactElement {

    const reducer = (state: ITableData[], newData: ITableData[]) => {
        return [...newData];
    };

    const [state, dispatch] = useReducer(reducer, [])
    
    return (
        <BrowserRouter>
            <Context.Provider value={{state, dispatch}}>
                <Switch>
                    <Route path='/' exact>
                        <Menu/>
                    </Route>   
                    <Route path='/table' exact>
                        <TablePage/>
                    </Route>            
                    <Route path='/graphs' exact>
                        <GraphsPage/>
                    </Route>
                    <Route path='/houses/:id'>
                        <ConsumerPage house={true} plant={false}/>
                    </Route>
                    <Route path='/plants/:id'>
                        <ConsumerPage house={false} plant={true}/>
                    </Route>
                </Switch>
            </Context.Provider>
        </BrowserRouter>
    )
}
