import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ITableData } from '../../types/types';
import SummaryTable from '../SummaryTable';
import Spinner from '../Spinner/Spinner';
import { useData } from '../MainScreen';

interface SelectedDateProps {
    startDate: Date;
    endDate: Date;
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: '30px auto'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export default function SearchPanel() {

    const { data, error, isLoading } = useData();

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

    return (
        <>
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
        {filteredData.length > 0 ?
            <SummaryTable data={filteredData}/> :
            <Spinner/>
        }
        </>
    );
}

