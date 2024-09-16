import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { LeadsComponent } from './leads/leads.component';
import { ClientsComponent } from './clients/clients.component';
import { CompaniesComponent } from './companies.component';
import { DetailClientComponent } from './all/detail-client/detail-client.component';
import { NewClientOrProspectComponent } from './new-client-or-prospect/new-client-or-prospect.component';


const companiesRoutes: Routes = [
	{
		path: '',
		component: CompaniesComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'todos' },
			{
				path: 'todos',
				component: AllComponent,
			},
			{
				path: 'nuevo-cliente',
				component: NewClientOrProspectComponent,
			},
			{
				path: 'editar-cliente/:id',
				component: NewClientOrProspectComponent,
			},
			{
				path: 'prospectos',
				component: ProspectsComponent,
			},
			{
				path: 'nuevo-prospecto',
				component: NewClientOrProspectComponent,
			},
			{
				path: 'detalles-empresa/:id',
				component: DetailClientComponent,
			},
			{
				path: 'editar-prospecto/:id',
				component: NewClientOrProspectComponent,
			},
			{
				path: 'leads',
				component: LeadsComponent,
			},
			{
				path: 'editar-lead/:id',
				component: NewClientOrProspectComponent,
			},
			{
				path: 'clientes',
				component: ClientsComponent,
			},
		
		]
	
	}
];

export const COMPANIES_ROUTES = RouterModule.forChild(companiesRoutes);