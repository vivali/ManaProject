import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManaProjectSharedModule } from '../shared';

import { PROJECT_ROUTE, CreateProjectComponent } from './';
import { ProjectComponent } from '../entities/project';

@NgModule({
    imports: [
        ManaProjectSharedModule,
        RouterModule.forRoot([ PROJECT_ROUTE ], { useHash: false })
    ],
    declarations: [
        CreateProjectComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectProjectModule {}
