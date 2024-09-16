import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities/activities.component';
import { ManagementComponent } from './management.component';



const managementRoutes: Routes = [
	{
		path: '',
		component: ManagementComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'llamadas-pendientes' },
			{
				path: 'actividades',
				component: ActivitiesComponent,
			},

		]
	}
];

export const MANAGEMENT_ROUTES = RouterModule.forChild(managementRoutes);