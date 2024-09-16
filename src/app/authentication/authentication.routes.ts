import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const autenticacionRoutes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'login' },
	{
		path: 'login',
		component: LoginComponent,
		pathMatch: 'full',
	}
];

export const AUTH_ROUTES = RouterModule.forChild(autenticacionRoutes);
