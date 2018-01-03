import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    TechnoService,
    TechnoPopupService,
    TechnoComponent,
    TechnoDetailComponent,
    TechnoDialogComponent,
    TechnoPopupComponent,
    TechnoDeletePopupComponent,
    TechnoDeleteDialogComponent,
    technoRoute,
    technoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...technoRoute,
    ...technoPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TechnoComponent,
        TechnoDetailComponent,
        TechnoDialogComponent,
        TechnoDeleteDialogComponent,
        TechnoPopupComponent,
        TechnoDeletePopupComponent,
    ],
    entryComponents: [
        TechnoComponent,
        TechnoDialogComponent,
        TechnoPopupComponent,
        TechnoDeleteDialogComponent,
        TechnoDeletePopupComponent,
    ],
    providers: [
        TechnoService,
        TechnoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectTechnoModule {}
