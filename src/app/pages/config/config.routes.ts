import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config.component';
import { ProductsComponent } from './products/products.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import { WayToPayComponent } from './way-to-pay/way-to-pay.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CompanyCategoriesComponent } from './company-categories/company-categories.component';
import { CampaignCategoriesComponent } from './campaign-categories/campaign-categories.component';
import { SolutionsComponent } from './solutions/solutions.component';

const configRoutes: Routes = [
	{
		path: '',
		component: ConfigComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'productos' },
			{
				path: 'productos',
				component: ProductsComponent,
			},
			{
				path: 'tipo-actividad',
				component: ActivityTypeComponent,
			},
			{
				path: 'forma-pago',
				component: WayToPayComponent,
			},
			{
				path: 'categoria-producto',
				component: ProductCategoriesComponent,
			},
			{
				path: 'categoria-cliente',
				component: CompanyCategoriesComponent,
			},
			{
				path: 'tipo-campanias',
				component: CampaignCategoriesComponent,
			},
			{
				path: 'soluciones',
				component: SolutionsComponent,
			},
		]
	}
];

export const CONFIG_ROUTES = RouterModule.forChild(configRoutes);