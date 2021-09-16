export interface IHouseConsumptions {
    Date: string;
    Weather: number;
    Consumption: number;
}

export interface IHouse {
    ConsumerId: number;
    Name: string;
    consumptions: IHouseConsumptions[];
}

export interface IPlantsConsumptions {
    Date: string;
    Price: number;
    Consumption: number;
}

export interface IPlant {
    ConsumerId: number;
    Name: string;
    consumptions: IPlantsConsumptions[];
}

export interface IData {
    houses: IHouse[]
    plants: IPlant[]
}

export interface ITableHouse {
    id: number,
    consumerId: number,
    name: string,
    consumption: number,
    weather: number,
}

export interface ITablePlant {
    id: number,
    consumerId: number,
    name: string,
    consumption: number,
    price: number,
}

export interface ITableData {
        id: number,
        date: Date,
        houses: ITableHouse[],
        plants: ITablePlant[]
}

