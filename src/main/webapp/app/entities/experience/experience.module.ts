import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    ExperienceService,
    ExperiencePopupService,
    ExperienceComponent,
    ExperienceDetailComponent,
    ExperienceDialogComponent,
    ExperiencePopupComponent,
    ExperienceDeletePopupComponent,
    ExperienceDeleteDialogComponent,
    experienceRoute,
    experiencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...experienceRoute,
    ...experiencePopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExperienceComponent,
        ExperienceDetailComponent,
        ExperienceDialogComponent,
        ExperienceDeleteDialogComponent,
        ExperiencePopupComponent,
        ExperienceDeletePopupComponent,
    ],
    entryComponents: [
        ExperienceComponent,
        ExperienceDialogComponent,
        ExperiencePopupComponent,
        ExperienceDeleteDialogComponent,
        ExperienceDeletePopupComponent,
    ],
    providers: [
        ExperienceService,
        ExperiencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectExperienceModule {}
