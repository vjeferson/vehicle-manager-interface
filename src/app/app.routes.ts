import { Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component';
import { VehicleFormComponent } from './pages/vehicle-form/vehicle-form.component';

export const routes: Routes = [
    { path: "", redirectTo: 'register', pathMatch: "full"},
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: 'home', component: VehicleListComponent
            },
            {
                path: 'register', component: VehicleFormComponent
            },
            // {
            //     path: 'edit', component: VehicleFormComponent
            // }
        ]

    },
];
