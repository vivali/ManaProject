import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    FnDescService,
    FnDescPopupService,
    FnDescComponent,
    FnDescDetailComponent,
    FnDescDialogComponent,
    FnDescPopupComponent,
    FnDescDeletePopupComponent,
    FnDescDeleteDialogComponent,
    fnDescRoute,
    fnDescPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fnDescRoute,
    ...fnDescPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FnDescComponent,
        FnDescDetailComponent,
        FnDescDialogComponent,
        FnDescDeleteDialogComponent,
        FnDescPopupComponent,
        FnDescDeletePopupComponent,
    ],
    entryComponents: [
        FnDescComponent,
        FnDescDialogComponent,
        FnDescPopupComponent,
        FnDescDeleteDialogComponent,
        FnDescDeletePopupComponent,
    ],
    providers: [
        FnDescService,
        FnDescPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectFnDescModule {}
