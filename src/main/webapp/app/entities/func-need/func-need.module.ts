import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    FuncNeedService,
    FuncNeedPopupService,
    FuncNeedComponent,
    FuncNeedDetailComponent,
    FuncNeedDialogComponent,
    FuncNeedPopupComponent,
    FuncNeedDeletePopupComponent,
    FuncNeedDeleteDialogComponent,
    funcNeedRoute,
    funcNeedPopupRoute,
} from './';

const ENTITY_STATES = [
    ...funcNeedRoute,
    ...funcNeedPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FuncNeedComponent,
        FuncNeedDetailComponent,
        FuncNeedDialogComponent,
        FuncNeedDeleteDialogComponent,
        FuncNeedPopupComponent,
        FuncNeedDeletePopupComponent,
    ],
    entryComponents: [
        FuncNeedComponent,
        FuncNeedDialogComponent,
        FuncNeedPopupComponent,
        FuncNeedDeleteDialogComponent,
        FuncNeedDeletePopupComponent,
    ],
    providers: [
        FuncNeedService,
        FuncNeedPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectFuncNeedModule {}
