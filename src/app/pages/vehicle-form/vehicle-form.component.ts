import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { take } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { VehicleApiService } from 'src/app/core/api/vehicle-api.service';

import { RoutePaths } from 'src/app/shared/enums/route-path.enum';

import { Vehicle, CreateVehicle, UpdateVehicle } from 'src/app/shared/interfaces';

import { vehiclesData } from 'src/app/shared/data/vehicles.data';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  private vehicle!: Vehicle;
  
  public editMode = false;
  public readonly routePaths = RoutePaths;
  public readonly yearPatentTheFirstCar = 1886;
  public readonly maxYearModel = new Date().getFullYear();
  public readonly maxYearManufacture = new Date().getFullYear() + 1;
  public readonly maxCharactersTextFields = 70;
  public readonly vehiclesOptions = vehiclesData;

  public formGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _vehicleApiService: VehicleApiService
  ) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      type: [null, [Validators.required]],
      plate: [null, [Validators.required]],
      chassis: [null, [Validators.required]],
      renavam: [null, [Validators.required]],
      model: [
        null,
        [
          Validators.required,
          Validators.maxLength(this.maxCharactersTextFields),
        ],
      ],
      brand: [
        null,
        [
          Validators.required,
          Validators.maxLength(this.maxCharactersTextFields)
        ],
      ],
      yearModel: [
        null,
        [
          Validators.required,
          Validators.min(this.yearPatentTheFirstCar),
          Validators.max(this.maxYearModel),
        ],
      ],
      yearManufacture: [
        null,
        [
          Validators.required,
          Validators.min(this.yearPatentTheFirstCar),
          Validators.max(this.maxYearManufacture),
        ],
      ],
    });

    const vehicleId = this._activatedRoute.snapshot.paramMap.get('id');
    if (vehicleId) {
      this.editMode = true;
      this._getVehicle(vehicleId);
    }
  }

  private _openSnackBar(message: string): void {
    this._snackBar.open(
      this._translateService.instant(message),
      this._translateService.instant('general.buttons.close'),
      {
        horizontalPosition: 'center' as MatSnackBarHorizontalPosition,
        verticalPosition: 'top' as MatSnackBarVerticalPosition,
      }
    );
  }

  private _getVehicle(vehicleId: string): void {
    this._vehicleApiService
      .getById(vehicleId)
      .pipe(take(1))
      .subscribe({
        next: (vehicle: Vehicle | null) => {
          if (vehicle) {
            this.vehicle = vehicle;
            this.formGroup.controls['type'].disable();
            this.formGroup.patchValue({
              type: vehicle.type,
              plate: vehicle.plate,
              chassis: vehicle.chassis,
              renavam: vehicle.renavam,
              model: vehicle.model,
              brand: vehicle.brand,
              yearModel: vehicle.yearModel,
              yearManufacture: vehicle.yearManufacture
            });
            return;
          }

          this._openSnackBar('general.messages.error-load-data');
          this.onRedirect(RoutePaths.VehicleList);
        },
      });
  }

  private _create(): void {
    const payload: CreateVehicle = {
      type: this.formGroup.value.type,
      plate: this.formGroup.value.plate.toUpperCase(),
      chassis: this.formGroup.value.chassis.toUpperCase(),
      renavam: this.formGroup.value.renavam,
      model: this.formGroup.value.model,
      brand: this.formGroup.value.brand,
      yearModel: +this.formGroup.value.yearModel,
      yearManufacture: +this.formGroup.value.yearManufacture,
    };

    this._vehicleApiService
      .create(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._openSnackBar('general.messages.success-register');
          this.onRedirect(RoutePaths.VehicleList);
        },
      });
  }

  private _update(): void {
    const payload: UpdateVehicle = {
      id: this.vehicle.id,
      plate: this.formGroup.value.plate.toUpperCase(),
      chassis: this.formGroup.value.chassis.toUpperCase(),
      renavam: this.formGroup.value.renavam,
      model: this.formGroup.value.model,
      brand: this.formGroup.value.brand,
      yearModel: +this.formGroup.value.yearModel,
      yearManufacture: +this.formGroup.value.yearManufacture,
    };

    this._vehicleApiService
      .update(payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._openSnackBar('general.messages.success-edit');
          this.onRedirect(RoutePaths.VehicleList);
        },
      });
  }

  public onRedirect(path: RoutePaths): void {
    this._router.navigateByUrl(path);
  }

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }


    if (this.editMode) {
      this._update();
      return;
    }

    this._create();
  }
}
