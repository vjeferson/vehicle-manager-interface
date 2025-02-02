import { Pipe, PipeTransform } from '@angular/core';

import { VehicleTypes } from 'src/app/shared/enums';

import { vehiclesData } from 'src/app/shared/data/vehicles.data';

@Pipe({
  name: 'vehicleType',
  standalone: true,
})
export class VehicleTypePipe implements PipeTransform {
  transform(value: VehicleTypes, ...args: unknown[]): unknown {
    return (
      vehiclesData.find((item) => item.value === value)?.name ||
      'general.components.pipe-unknow'
    );
  }
}
