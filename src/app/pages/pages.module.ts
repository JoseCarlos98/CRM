import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PagesComponent } from './pages.component';
import { PAGE_ROUTES } from './pages.routes';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
		RouterLinkActive,
    PAGE_ROUTES,
  ]
})
export class PagesModule { }
