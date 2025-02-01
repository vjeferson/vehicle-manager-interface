import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './pages/vehicle-form/vehicle-form.component';

import { RoutePaths } from 'src/app/shared/enums/route-path.enum';

export const routes: Routes = [
  { path: '', redirectTo: RoutePaths.VehicleList, pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: RoutePaths.VehicleList,
        component: VehicleListComponent,
      },
      {
        path: RoutePaths.VehicleRegister,
        component: VehicleFormComponent,
      },
      // {
      //     path: 'edit', component: VehicleFormComponent
      // }
    ],
  },
];
