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

export interface IHouses {
    id: number,
    name: string,
    consumption: number,
    weather: number,
    editMode: boolean
}

export interface IPlants {
    id: number,
    name: Date,
    consumption: number,
    price: number,
    editMode: boolean
}

export interface ITableData {
        id: number,
        date: Date,
        houses: IHouses[],
        plants: IPlants[]
}

