export interface Car {
    id: number;
    model: CarModel;
    inStock: boolean;
    vin: string;
    mileage: string;
    price: number;
}

export interface CarResponse {
    id: number;
    model_id: number;
    in_stock: boolean;
    vin: string;
    mileage: string;
    price: number;
}

export interface CarRequest {
    model_id: number[];
    in_stock: boolean;
    vin: string;
    mileage: string;
    price: number;
}

export type CarForm = Omit<Car, 'id'>

export interface CarModel {
    id: number;
    seats: number;
    additionalInfo: string;
    brand: string;
    model: string;
    fuelConsumption: number;
    doors: number;
    year: number;
}

export interface CarModelsResponse {
    id: number;
    seats: number;
    additional_info: string;
    brand: string;
    model: string;
    fuel_consumption: number;
    doors: number;
    year: number;
}

export interface CarModelsRequest {
    seats: number;
    addiitonal_info: string;
    brand: string;
    model: string;
    fuel_consumption: number;
    doors: number;
    year: number;
}

export type CarModelForm = Omit<CarModel, 'id'>
