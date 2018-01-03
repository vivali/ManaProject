import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ManaProjectExperienceModule } from './experience/experience.module';
import { ManaProjectFuncNeedModule } from './func-need/func-need.module';
import { ManaProjectRoleModule } from './role/role.module';
import { ManaProjectTechNeedModule } from './tech-need/tech-need.module';
import { ManaProjectPreRelationshipsModule } from './pre-relationships/pre-relationships.module';
import { ManaProjectTnDescModule } from './tn-desc/tn-desc.module';
import { ManaProjectProjectModule } from './project/project.module';
import { ManaProjectFnDescModule } from './fn-desc/fn-desc.module';
import { ManaProjectVersionModule } from './version/version.module';
import { ManaProjectProfileModule } from './profile/profile.module';
import { ManaProjectTechnoModule } from './techno/techno.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ManaProjectExperienceModule,
        ManaProjectFuncNeedModule,
        ManaProjectRoleModule,
        ManaProjectTechNeedModule,
        ManaProjectPreRelationshipsModule,
        ManaProjectTnDescModule,
        ManaProjectProjectModule,
        ManaProjectFnDescModule,
        ManaProjectVersionModule,
        ManaProjectProfileModule,
        ManaProjectTechnoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManaProjectEntityModule {}
