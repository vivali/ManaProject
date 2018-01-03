import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../../shared';
import {
    VersionService,
    VersionPopupService,
    VersionComponent,
    VersionDetailComponent,
    VersionDialogComponent,
    VersionPopupComponent,
    VersionDeletePopupComponent,
    VersionDeleteDialogComponent,
    versionRoute,
    versionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...versionRoute,
    ...versionPopupRoute,
];

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VersionComponent,
        VersionDetailComponent,
        VersionDialogComponent,
        VersionDeleteDialogComponent,
        VersionPopupComponent,
        VersionDeletePopupComponent,
    ],
    entryComponents: [
        VersionComponent,
        VersionDialogComponent,
        VersionPopupComponent,
        VersionDeleteDialogComponent,
        VersionDeletePopupComponent,
    ],
    providers: [
        VersionService,
        VersionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectVersionModule {}
