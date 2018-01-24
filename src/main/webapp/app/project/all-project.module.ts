import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../shared';
import { ManaProjectAdminModule } from '../admin/admin.module';
import { allProjectRoute, allProjectPopupRoute } from './all-project.route';
import {
    AllProjectService,
    AllProjectComponent,
    AllProjectDeleteDialogComponent,
    AllProjectDeletePopupComponent,
    AllProjectDetailComponent,
    AllProjectDialogComponent,
    AllProjectPopupComponent,
    AllProjectPopupService
} from './';
import { FormsModule } from '@angular/forms';

const ENTITY_STATES = [
    ...allProjectRoute,
    ...allProjectPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        ManaProjectAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        FormsModule
    ],
    declarations: [
        AllProjectComponent,
        AllProjectDetailComponent,
        AllProjectDialogComponent,
        AllProjectDeleteDialogComponent,
        AllProjectPopupComponent,
        AllProjectDeletePopupComponent,
    ],
    entryComponents: [
        AllProjectComponent,
        AllProjectDialogComponent,
        AllProjectPopupComponent,
        AllProjectDeleteDialogComponent,
        AllProjectDeletePopupComponent,
    ],
    providers: [
        AllProjectService,
        AllProjectPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectAllProjectModule {}
