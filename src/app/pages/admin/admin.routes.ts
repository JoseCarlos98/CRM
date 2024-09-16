import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { DownloadEmailsComponent } from './download-emails/download-emails.component';
import { NewUserComponent } from './main-users/users/new-user/new-user.component';
import { NewRolComponent } from './main-users/users-rol/new-rol/new-rol.component';
import { MainProductsComponent } from './main-products/main-products.component';
import { NewDiscountComponent } from './main-products/discounts/new-discount/new-discount.component';
import { BonusesComponent } from './bonuses/bonuses.component';
import { NewBonusComponent } from './bonuses/new-bonus/new-bonus.component';
import { ProfileComponent } from './profile/profile.component';


const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'perfil',
				component: ProfileComponent,
			},
			{
				path: 'usuarios',
				component: MainUsersComponent,
			},
			{
				path: 'nuevo-usuario',
				component: NewUserComponent,
			},
			{
				path: 'editar-usuario/:id',
				component: NewUserComponent,
			},
			{
				path: 'nuevo-rol',
				component: NewRolComponent,
			},
			{
				path: 'editar-rol/:id',
				component: NewRolComponent,
			},
			{
				path: 'bonos',
				component: BonusesComponent,
			},
			{
				path: 'nuevo-bono',
				component: NewBonusComponent,
			},
			{
				path: 'editar-bono/:id',
				component: NewBonusComponent,
			},
			{
				path: 'clonar-bono/:id',
				component: NewBonusComponent,
			},
			{
				path: 'productos',
				component: MainProductsComponent,
			},
			{
				path: 'descarga-correos',
				component: DownloadEmailsComponent,
			},
			{
				path: 'nuevo-descuento',
				component: NewDiscountComponent,
			},
			{
				path: 'editar-descuento/:id',
				component: NewDiscountComponent,
			}
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);