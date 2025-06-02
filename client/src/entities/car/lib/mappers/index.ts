import {
  Car,
  CarResponse,
  CarModel,
  CarModelsResponse,
} from "../../types/carTypes";

export const mapCarModelResponceToApi = (
  carModel: CarModelsResponse
): CarModel => {
  return {
    id: carModel.id,
    seats: carModel.seats,
    additionalInfo: carModel.additional_info,
    brand: carModel.brand,
    model: carModel.model,
    fuelConsumption: carModel.fuel_consumption,
    doors: carModel.doors,
    year: carModel.year,
  };
};

export const mapCarModelsResponceToApi = (
  carModels: CarModelsResponse[]
): CarModel[] => {
  return carModels.map(mapCarModelResponceToApi);
};

export const mapCarApiResponseToUi = (
  car: CarResponse,
  carModels: CarModel[]
): Car => {
  const findedCarModel = carModels.find((carModel) => carModel.id === car.id);

  if (!findedCarModel) {
    throw new Error(`Модель с id ${car.id} не найдена`);
  }
  
  return {
    id: car.id,
    model: findedCarModel,
    inStock: car.in_stock,
    vin: car.vin,
    mileage: car.mileage,
    price: car.price,
  };
};

export const mapCarsApiResponseToUi = (
  cars: CarResponse[],
  carModels: CarModel[]
): Car[] => {
  return cars.map((car) => mapCarApiResponseToUi(car, carModels));
};
