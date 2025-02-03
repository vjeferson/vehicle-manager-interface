import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { take } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { VehicleApiService } from 'src/app/core/api/vehicle-api.service';

import { RoutePaths } from 'src/app/shared/enums/route-path.enum';

import { ColumnTable, Vehicle } from 'src/app/shared/interfaces';

import { VehicleTypePipe } from 'src/app/shared/pipes/vehicle-type.pipe';

import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [VehicleTypePipe],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public readonly routePaths = RoutePaths;
  public readonly defaultItemsPerPage = 5;
  public readonly columnsToDisplay: ColumnTable[] = [
    {
      columnDef: 'type',
      header: 'pages.vehicle-list.column-type',
      cell: (element: Vehicle) => this._vehicleTypePipe.transform(element.type),
    },
    {
      columnDef: 'plate',
      header: 'pages.vehicle-list.column-plate',
      cell: (element: Vehicle) => element.plate,
    },
    {
      columnDef: 'chassis',
      header: 'pages.vehicle-list.column-chassis',
      cell: (element: Vehicle) => element.chassis,
    },
    {
      columnDef: 'renavam',
      header: 'pages.vehicle-list.column-renavam',
      cell: (element: Vehicle) => element.renavam,
    },
    {
      columnDef: 'modelAndBrand',
      header: 'pages.vehicle-list.column-model-brand',
      cell: (element: Vehicle) => `${element.brand}/${element.model}`,
    },
    {
      columnDef: 'yearModelAndManufacture',
      header: 'pages.vehicle-list.column-year-model-manufacture',
      cell: (element: Vehicle) =>
        `${element.yearModel}/${element.yearManufacture}`,
    },
  ];
  public displayedColumns: string[] = [
    ...this.columnsToDisplay.map((item) => item.columnDef),
    'actions',
  ];
  public dataSource = new MatTableDataSource<Vehicle>([]);

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _alertService: AlertService,
    private _vehicleTypePipe: VehicleTypePipe,
    private _vehicleApiService: VehicleApiService
  ) { }

  ngOnInit(): void {
    this._search();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  private _search(): void {
    this._vehicleApiService
      .search()
      .pipe(take(1))
      .subscribe({
        next: (result: Array<Vehicle>) => {
          this.dataSource.data = result;
        },
        error: () => (this.dataSource.data = []),
      });
  }

  private _delete(id: string): void {
    this._vehicleApiService
      .delete(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._openSnackBar('general.messages.success-delete');
          this._search();
        },
      });
  }

  public onRedirect(path: RoutePaths) {
    this._router.navigateByUrl(path);
  }

  public onEdit(id: string): void {
    this._router.navigateByUrl(`${RoutePaths.VehicleEdit}/${id}`);
  }

  public onDelete(id: string): void {
    const dialogRef = this._alertService.open({
      message: 'Deseja realmente remover o registro?',
      textButtonCancel: 'general.buttons.close',
      textButtonConfirm: 'general.buttons.confirm'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._delete(id);
      }
    });
  }
}
