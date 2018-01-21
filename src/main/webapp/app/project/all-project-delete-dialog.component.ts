import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Project, ProjectService } from '../entities/project';
import { TechNeed, TechNeedService } from '../entities/tech-need';
import { TnDesc, TnDescService } from '../entities/tn-desc';
import { FuncNeed, FuncNeedService } from '../entities/func-need';
import { FnDesc, FnDescService } from '../entities/fn-desc';
import { Techno, TechnoService } from '../entities/techno';
import { Version, VersionService } from '../entities/version';
import { Role, RoleService } from '../entities/role';
import { Experience, ExperienceService } from '../entities/experience';
import { PreRelationships, PreRelationshipsService } from '../entities/pre-relationships';

import { AllProjectPopupService } from './all-project-popup.service';

@Component({
    selector: 'jhi-all-project-delete-dialog',
    templateUrl: './all-project-delete-dialog.component.html'
})
export class AllProjectDeleteDialogComponent {

    project: Project;
    techNeed: TechNeed;
    tnDesc: TnDesc;
    funcNeed: FuncNeed;
    fnDesc: FnDesc;
    techno: Techno;
    version: Version;
    role: Role;
    experience: Experience;
    preRelationships: PreRelationships;

    constructor(
        private projectService: ProjectService,
        private techNeedService: TechNeedService,
        private tnDescService: TnDescService,
        private funcNeedService: FuncNeedService,
        private fnDescService: FnDescService,
        private technoService: TechnoService,
        private versionService: VersionService,
        private roleService: RoleService,
        private experienceService: ExperienceService,
        private preRelationshipsService: PreRelationshipsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectListModification',
                content: 'Deleted an project'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-all-project-delete-popup',
    template: ''
})
export class AllProjectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: AllProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projectPopupService
                .open(AllProjectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
