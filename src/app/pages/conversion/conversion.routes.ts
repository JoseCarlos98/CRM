import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { ConversionComponent } from './conversion.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';
import { PreBillComponent } from './pre-bill/pre-bill.component';

const quotesRoutes: Routes = [
	{
		path: '',
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
			{
				path: 'editar-cotizacion/:id',
				component: NewQuoteComponent,
			},
			{
				path: 'nueva-cotizacion',
				component: NewQuoteComponent,
			},
			{
				path: 'pre-factura',
				component: PreBillComponent,
			},
		]
	
	}
];

export const QUOTES_ROUTES = RouterModule.forChild(quotesRoutes);