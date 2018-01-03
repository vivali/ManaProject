import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    TechNeedService,
    TechNeedPopupService,
    TechNeedComponent,
    TechNeedDetailComponent,
    TechNeedDialogComponent,
    TechNeedPopupComponent,
    TechNeedDeletePopupComponent,
    TechNeedDeleteDialogComponent,
    techNeedRoute,
    techNeedPopupRoute,
} from './';

const ENTITY_STATES = [
    ...techNeedRoute,
    ...techNeedPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TechNeedComponent,
        TechNeedDetailComponent,
        TechNeedDialogComponent,
        TechNeedDeleteDialogComponent,
        TechNeedPopupComponent,
        TechNeedDeletePopupComponent,
    ],
    entryComponents: [
        TechNeedComponent,
        TechNeedDialogComponent,
        TechNeedPopupComponent,
        TechNeedDeleteDialogComponent,
        TechNeedDeletePopupComponent,
    ],
    providers: [
        TechNeedService,
        TechNeedPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectTechNeedModule {}
