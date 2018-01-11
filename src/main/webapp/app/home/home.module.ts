import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';
import { NgAutoCompleteModule } from 'ng-auto-complete/ng-autocomplete.module';

@NgModule({
    imports: [
        ManaProjectSharedModule,
        NgAutoCompleteModule,
        RouterModule.forRoot([ HOME_ROUTE ], { useHash: false })
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectHomeModule {}
