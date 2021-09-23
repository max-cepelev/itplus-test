import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { ITableHouse, ITablePlant } from '../../types/types';
import { useData } from '../MainScreen';

import './consumerNavigation.scss'


export default function ConsumersNavigation(): JSX.Element {

    const {data} = useData()

    const history = useHistory()

    if (data) {
        return (
            <nav className='consumers'>
                <Button style={{backgroundColor: 'teal'}} onClick={() => history.push('/')} variant="contained" color="primary">Назад</Button>
                <h3>Потребители</h3>
                <ul>
                    {data[0].houses.map((house: ITableHouse) => (
                        <li key={house.id}><Link to={`/houses/${house.id}`}>
                            <p>{house.name}</p>
                        </Link></li>
                    ))}
                    {data[0].plants.map((plant: ITablePlant) => (
                        <li key={plant.id}><Link to={`/plants/${plant.id}`}>
                            <p>{plant.name}</p>
                        </Link></li>
                    ))}
                </ul>
            </nav>
        )
    }

    return (
        <nav className='consumers'>
            <h4>Нет данных</h4>
        </nav>
    )
}

