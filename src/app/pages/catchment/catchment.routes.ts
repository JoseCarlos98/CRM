import { RouterModule, Routes } from '@angular/router';
import { CatchmentComponent } from './catchment.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampingnComponent } from './campaigns/new-campingn/new-campingn.component';
import { CampainResultsComponent } from './campaigns/campain-results/campain-results.component';

const catchmentRoutes: Routes = [
	{
		path: '',
		component: CatchmentComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'campanias' },
			{
				path: 'campanias',
				component: CampaignsComponent,
			},
			{
				path: 'resultados-campanias/:type',
				component: CampainResultsComponent,
			},
			{
				path: 'nueva-campania',
				component: NewCampingnComponent,
			},
			{
				path: 'clonar-campania/:id',
				component: NewCampingnComponent,
			},
			{
				path: 'editar-campania/:id',
				component: NewCampingnComponent,
			},
		]
	
	}
];

export const CATCHMENT_ROUTES = RouterModule.forChild(catchmentRoutes);