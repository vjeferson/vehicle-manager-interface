import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { RoutePaths } from 'src/app/shared/enums/route-path.enum';

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
  public readonly routePaths = RoutePaths;
  public readonly yearPatentTheFirstCar = 1886;
  public readonly maxYearModel = new Date().getFullYear();
  public readonly maxYearManufacture = new Date().getFullYear() + 1;
  public readonly maxCharactersTextFields = 70;
  public readonly vehiclesOptions = vehiclesData;

  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

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
        [Validators.required],
        Validators.maxLength(this.maxCharactersTextFields),
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
  }

  public onRedirect(path: RoutePaths): void {
    this._router.navigateByUrl(path);
  }

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      console.log(this.formGroup.controls);
      return;
    }

    console.log(this.formGroup.value);
  }
}
