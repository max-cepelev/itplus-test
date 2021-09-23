import React, { Dispatch, SetStateAction, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ITableData } from '../types/types';

interface Props {
    data: ITableData[],
    setFilterData: Dispatch<SetStateAction<ITableData[]>>
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
            borderRadius: '8px',
            boxShadow: '10px 10px 25px rgba(0, 0, 0, 0.25)',
            fontFamily: "Montserrat Alternates"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }),
);

export default function DatesPanel({data, setFilterData}: Props) {

  // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState<SelectedDateProps>({
        startDate: new Date('2019-01-01'),
        endDate: new Date('2019-12-31'),
    });

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                const startDate = item.date.valueOf() + 86400000;
                const endDate = item.date.valueOf()
                if (startDate >= selectedDate.startDate.valueOf() && endDate <= selectedDate.endDate.valueOf()) {
                    return item;
                }
                return null
            })
            setFilterData(tempData)
        }

    }, [selectedDate, data, setFilterData])

    return (
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
    );
}

