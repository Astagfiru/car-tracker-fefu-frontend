import { getAllCars } from "./api/getAllCars";
import { getAllCarModels } from "./api/getAllCarModels";
import { useCarsStore } from "./lib/model/carStore";
import { useCarModelsStore } from "./lib/model/carModelStore";
import type { CarForm, Car, CarModel, CarModelForm } from "./types/carTypes";
import { mapCarsApiResponseToUi, mapCarModelsResponceToApi } from "./lib/mappers";

export { getAllCars, getAllCarModels, useCarsStore, useCarModelsStore, mapCarsApiResponseToUi, mapCarModelsResponceToApi}
export type { CarForm, Car, CarModel, CarModelForm}