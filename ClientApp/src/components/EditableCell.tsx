import React, { Dispatch, SetStateAction, useState } from 'react'
import DoneIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";


interface EditableCellProps {
    cellValue: number, 
    rowId: number, 
    cellId: number, 
    cellKey: string,
    updateTableData: (rowId: number, cellId: number, cellKey: string , cellValue: number) => void,
    setIsEditMode: Dispatch<SetStateAction<{rowId: number | null, cellId: number | null}>>
}

export default function EditableCell(initialValue: EditableCellProps) {

    const [value, setValue] = useState<EditableCellProps>(initialValue)

    const {rowId, cellKey, cellValue, cellId, updateTableData, setIsEditMode} = value

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        if (!isNaN(+value)) {
            setValue((prevValue) => {
                return {
                    ...prevValue,
                    cellValue: +value
                }
            })
        }
    }

    const onSave = () => {
        updateTableData(rowId, cellId, cellKey, cellValue)
    }

    const onCancel = () => {
        setIsEditMode({rowId: null, cellId: null})
    }

    const onPressKey = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSave();
        }
        if (event.key === 'Escape' || event.key === 'Esc') {
            onCancel()
        }
    }

    return (
        <>
        <input
            style={{width: '85%', textAlign: 'center', fontSize: '12px', border: '2px solid #4040ff', borderRadius: '5px'}}
            type='number'
            step='any'
            autoFocus
            name={cellKey}
            value={cellValue}
            onChange={handleChange}
            onKeyPress={(e) => onPressKey(e)}
        />
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '5px'}}>
            <DoneIcon onClick={onSave} style={{color: 'green'}}/>
            <CloseIcon onClick={onCancel} style={{color: 'red'}}/>
        </div>
        </>
    )
}


