import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, inject } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { provideFuse } from '@fuse';
import { appRoutes } from 'app/app.routes';
import { provideIcons } from 'app/shared/icons/icons.provider';
import localeEs from '@angular/common/locales/es';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: LOCALE_ID, useValue: 'es' },

        provideAnimations(),
        provideHttpClient(),
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({scrollPositionRestoration: 'enabled'}),
        ),

        // Material Date Adapter
        {
            provide : DateAdapter,
            useClass: LuxonDateAdapter,
        },
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D',
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },

        // Fuse
        provideIcons(),
        provideFuse({
            fuse   : {
                layout : 'classy',
                scheme : 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme  : 'theme-default',
                themes : [
                ],
            },
        }),
    ],
};
export class AppModule {
  constructor() {
    registerLocaleData(localeEs);
  }
}