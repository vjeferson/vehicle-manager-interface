import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { v4 as uuidv4 } from 'uuid';

import { CreateVehicle, UpdateVehicle, Vehicle } from 'src/app/shared/interfaces';

import { LocalStorageKeys } from 'src/app/shared/enums';

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private _mock: Array<Vehicle> = [];

  constructor() {
    const vehicles = localStorage.getItem(LocalStorageKeys.MockVehicles);
    if (vehicles) {
      this._mock =
        typeof vehicles === 'string'
          ? (JSON.parse(vehicles) as Array<Vehicle>)
          : (vehicles as any);
    }
  }

  public search(): Observable<Array<Vehicle>> {
    return of(this._mock);
  }

  public create(payload: CreateVehicle): Observable<boolean> {
    const vehicle = Object.assign(payload, { id: uuidv4() });
    this._mock.push(vehicle);
    localStorage.setItem(
      LocalStorageKeys.MockVehicles,
      JSON.stringify(this._mock)
    );
    return of(true);
  }

  public getById(vehicleId: string): Observable<Vehicle | null> {
    const vehicle = this._mock.find((vehicle) => vehicle.id === vehicleId);
    return of(vehicle || null);
  }

  public update(payload: UpdateVehicle): Observable<boolean> {
    const vehicleIndex = this._mock.findIndex((vehicle) => vehicle.id === payload.id);
    const newVehicle = Object.assign(this._mock[vehicleIndex], payload);
    this._mock[vehicleIndex] = newVehicle;
    localStorage.setItem(
      LocalStorageKeys.MockVehicles,
      JSON.stringify(this._mock)
    );
    return of(true);
  }
}
