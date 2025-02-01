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

import { TranslateModule } from '@ngx-translate/core';

import { RoutePaths } from 'src/app/shared/enums/route-path.enum';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent implements OnInit {
  public readonly routePaths = RoutePaths;

  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _router: Router) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      plate: [null, [Validators.required]],
      chassis: [null, [Validators.required]],
      renavam: [null, [Validators.required]],
      model: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      year: [null, [Validators.required]],
    });
  }

  public onRedirect(path: RoutePaths):void {
    this._router.navigateByUrl(path);
  }

  public onSubmit():void {
    this.formGroup.markAllAsTouched();

    if(this.formGroup.invalid){
      return;
    }
  }
}
