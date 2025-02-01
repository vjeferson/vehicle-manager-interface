import { VehicleTypes } from 'src/app/shared/enums/vehicle-types.enum';

import { Options } from 'src/app/shared/interfaces/options.interface';

export const vehiclesData: Array<Options<VehicleTypes>> = [
  { name: 'general.components.vehicle-options.motorcycle', value: VehicleTypes.Motorcycle },
  { name: 'general.components.vehicle-options.automobile',  value: VehicleTypes.Automobile },
  { name: 'general.components.vehicle-options.minibus',  value: VehicleTypes.Minibus },
  { name: 'general.components.vehicle-options.bus',  value: VehicleTypes.Bus },
  { name: 'general.components.vehicle-options.truck',  value: VehicleTypes.Truck },
];
