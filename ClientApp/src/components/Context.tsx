import React from "react";
import { ITableData } from '../types/types';

export const Context = React.createContext({
    state: [] as ITableData[],
    dispatch: (state: ITableData[]) => {},
});
