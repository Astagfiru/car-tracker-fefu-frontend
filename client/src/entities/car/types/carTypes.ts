export interface CarType {
    id: number;
    model_id: number[];
    avaliable: boolean;
    vin: string;
    mileage: string;
    price: number;
}

export type CarFormType = Omit<CarType, 'id'>
export interface CarTypeResponse extends CarType {}

export interface CarModelType {
    id: number;
    seats: number;
    addiitonalInfo: string;
    brand: string;
    model: string;
    fuelConsumption: number;
    doors: number;
    year: number;
}

export type CarModelFormType = Omit<CarModelType, 'id'>
export interface CarModelResponse extends CarModelType {}