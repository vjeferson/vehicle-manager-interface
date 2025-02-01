import { VehicleTypes } from "src/app/shared/enums/vehicle-types.enum";

export interface CreateVehicle {
  type: VehicleTypes;
  plate: string;
  chassis: string;
  renavam: number;
  model: string;
  brand: string;
  yearModel: number;
  yearManufacture: number;
}
