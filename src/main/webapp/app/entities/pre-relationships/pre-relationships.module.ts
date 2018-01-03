import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    PreRelationshipsService,
    PreRelationshipsPopupService,
    PreRelationshipsComponent,
    PreRelationshipsDetailComponent,
    PreRelationshipsDialogComponent,
    PreRelationshipsPopupComponent,
    PreRelationshipsDeletePopupComponent,
    PreRelationshipsDeleteDialogComponent,
    preRelationshipsRoute,
    preRelationshipsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...preRelationshipsRoute,
    ...preRelationshipsPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PreRelationshipsComponent,
        PreRelationshipsDetailComponent,
        PreRelationshipsDialogComponent,
        PreRelationshipsDeleteDialogComponent,
        PreRelationshipsPopupComponent,
        PreRelationshipsDeletePopupComponent,
    ],
    entryComponents: [
        PreRelationshipsComponent,
        PreRelationshipsDialogComponent,
        PreRelationshipsPopupComponent,
        PreRelationshipsDeleteDialogComponent,
        PreRelationshipsDeletePopupComponent,
    ],
    providers: [
        PreRelationshipsService,
        PreRelationshipsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectPreRelationshipsModule {}
