import React, { useEffect, useState } from 'react'
import { useData } from './MainScreen';
import { Button, Spinner } from 'reactstrap';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { ITableData } from '../types/types';
import HouseTable from './HouseTable';
import PlantTable from './PlantTable';
import { useHistory } from 'react-router';

interface Props {
    house: boolean
    plant: boolean
}

interface SelectedDateProps {
    startDate: Date;
    endDate: Date;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: '30px auto',
            backgroundColor: '#ffffff',
            maxWidth: '700px',
            height: '90px',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: '8px'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);


export default function ConsumerPage({house, plant}: Props): JSX.Element {

    const { data, error, isLoading } = useData();

    const history = useHistory()

      // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState<SelectedDateProps>({
        startDate: new Date('2019-01-01'),
        endDate: new Date('2019-12-31'),
    });

    const [filteredData, setFilteredData] = useState<ITableData[]>([])

    const handleDateChange = (event: any) => {
        const {name, value} = event.target;
        setSelectedDate(prevValue => {
            return {
                ...prevValue,
                [name]: new Date(value)
            }
        });
    };

    const classes = useStyles();

    useEffect(() => {

        if (data) {
            const tempData: ITableData[] = data.filter((item) => {
                const startDate = new Date(item.date).valueOf() + 86400000;
                const endDate = new Date(item.date).getTime()
                if (startDate >= selectedDate.startDate.getTime() && endDate <= selectedDate.endDate.getTime()) {
                    return item;
                }
            })
            setFilteredData(tempData)
        }

    }, [selectedDate, data])

    if (isLoading) return <Spinner/>

    if (error) return <h3>Ошибка. Данные не получены</h3>

    if (data) {
        return (
            <>
            <Button onClick={() => history.push('/table')} variant="contained" color="primary">Назад</Button>
            <form className={classes.container} noValidate>
                <TextField
                    id="startDate"
                    name='startDate'
                    label="Начальная дата"
                    type="date"
                    value={new Intl.DateTimeFormat('fr-CA').format(new Date(selectedDate.startDate))}
                    className={classes.textField}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="endDate"
                    name='endDate'
                    label="Конечная дата"
                    type="date"
                    value={new Intl.DateTimeFormat('fr-CA').format(new Date(selectedDate.endDate))}
                    className={classes.textField}
                    onChange={handleDateChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
            {house && <HouseTable data={filteredData}/>}
            {plant && <PlantTable data={filteredData}/>}
            </>
        )
    }

    return (
        <Spinner/>
    )
}
