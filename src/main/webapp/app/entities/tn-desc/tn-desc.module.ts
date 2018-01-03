import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    TnDescService,
    TnDescPopupService,
    TnDescComponent,
    TnDescDetailComponent,
    TnDescDialogComponent,
    TnDescPopupComponent,
    TnDescDeletePopupComponent,
    TnDescDeleteDialogComponent,
    tnDescRoute,
    tnDescPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tnDescRoute,
    ...tnDescPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TnDescComponent,
        TnDescDetailComponent,
        TnDescDialogComponent,
        TnDescDeleteDialogComponent,
        TnDescPopupComponent,
        TnDescDeletePopupComponent,
    ],
    entryComponents: [
        TnDescComponent,
        TnDescDialogComponent,
        TnDescPopupComponent,
        TnDescDeleteDialogComponent,
        TnDescDeletePopupComponent,
    ],
    providers: [
        TnDescService,
        TnDescPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectTnDescModule {}
