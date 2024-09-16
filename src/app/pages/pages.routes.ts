import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const pageRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'dashboard' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
			{
				path: 'captacion',
				loadChildren: () => import('./catchment/catchment.module').then((m) => m.CatchmentModule),
			},
			{
				path: 'conversion',
				loadChildren: () => import('./conversion/conversion.module').then((m) => m.ConversionModule),
			},
			{
				path: 'empresas',
				loadChildren: () => import('./companies/companies.module').then((m) => m.CompaniesModule),
			},
			{
				path: 'reactivacion',
				loadChildren: () => import('./reactivation/reactivation.module').then((m) => m.ReactivationModule),
			},
			{
				path: 'comunicaciones',
				loadChildren: () => import('./comunications/comunications.module').then((m) => m.ComunicationsModule),
			},
			{
				path: 'gestion',
				loadChildren: () => import('./management/management.module').then((m) => m.ManagementModule),
			},
			{
				path: 'admin',
				loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
			},
			{
				path: 'configuracion',
				loadChildren: () => import('./config/config.module').then((m) => m.ConfigModule),
			},
			{path: 'mailbox', loadChildren: () => import('app/pages/comunications/mailbox/mailbox.routes')},

		],
	},
];

export const PAGE_ROUTES = RouterModule.forChild(pageRoutes);