import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router';
import ConsumerTable from '../ConsumerTable';

interface Props {
    house: boolean
    plant: boolean
}


export default function ConsumerPage({house, plant}: Props): JSX.Element {

    const history = useHistory()

    return (
        <>
        <Button style={{backgroundColor: 'teal'}} onClick={() => history.push('/table')} variant="contained" color="primary">Назад</Button>
        <ConsumerTable house={house} plant={plant}/>
        </>
    )
}
