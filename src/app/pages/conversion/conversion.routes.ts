import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';
import { ConversionComponent } from './conversion.component';

const quotesRoutes: Routes = [
	{
		path: '',
		// canActivate: [PermisosGuard],
		component: ConversionComponent,
		children: [
			{
				path: 'cotizaciones',
				component: QuotesComponent,
			},
			{
				path: 'detalle-cotizacion/:id',
				component: DetailsQuotesComponent,
			},
		]
	
	}
];

export const QUOTES_ROUTES = RouterModule.forChild(quotesRoutes);