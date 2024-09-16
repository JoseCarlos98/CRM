import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
		path: 'autenticacion',
		loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
	},
    { 
        path: 'home', 
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
        // canActivate: [AuthGuard]
    }
];
