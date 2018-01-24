import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Project } from '../entities/project';
import { TechNeed } from '../entities/tech-need';
import { TnDesc } from '../entities/tn-desc';
import { FuncNeed } from '../entities/func-need';
import { FnDesc } from '../entities/fn-desc';
import { Techno } from '../entities/techno';
import { Version } from '../entities/version';
import { Role } from '../entities/role';
import { Experience } from '../entities/experience';
import { PreRelationships } from '../entities/pre-relationships';

import { AllProjectService } from './all-project.service';

import { AllProjectPopupService } from './all-project-popup.service';
import { User, UserService, Principal } from '../shared';
import { ResponseWrapper } from '../shared';

@Component({
    selector: 'jhi-all-project-dialog',
    templateUrl: './all-project-dialog.component.html'
})
export class AllProjectDialogComponent implements OnInit {
    projects: Project[];
    techNeeds: TechNeed[];
    tnDescs: TnDesc[];
    funcNeeds: FuncNeed[];
    fnDescs: FnDesc[];
    technos: Techno[];
    versions: Version[];
    roles: Role[];
    experiences: Experience[];
    preRelationships: PreRelationships[];

    project: Project;
    techNeed: TechNeed;
    tnDesc: TnDesc;
    funcNeed: FuncNeed;
    fnDesc: FnDesc;
    techno: Techno;
    version: Version;
    role: Role;
    experience: Experience;
    preRelationship: PreRelationships;

    isSaving: boolean;
    currentPage = 0;

    users: User[];
    user: User = new User();

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private allProjectService: AllProjectService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((resp) => {
            this.user.id = resp.id;
            this.user.login = resp.login;
            this.user.firstName = resp.firstName;
            this.user.lastName = resp.lastName;
            this.user.email = resp.email;
        });
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    next() {
        ++this.currentPage;
    }

    previous() {
        --this.currentPage;
    }

    save() {
        this.isSaving = true;
        if (this.project.id !== undefined) {
            this.allProjectService.update(this.project);
        } else {
            this.project.user = this.user;
            this.allProjectService.create(this.project);
        }
    }

    // private subscribeToSaveResponse(result: Observable<Project>) {
    //     result.subscribe((res: Project) =>
    //         this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    // }

    // private onSaveSuccess(result: Project) {
    //     this.eventManager.broadcast({ name: 'projectListModification', content: 'OK'});
    //     this.isSaving = false;
    //     this.activeModal.dismiss(result);
    // }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-all-project-popup',
    template: ''
})
export class AllProjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private allProjectPopupService: AllProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.allProjectPopupService
                    .open(AllProjectDialogComponent as Component, params['id']);
            } else {
                this.allProjectPopupService
                    .open(AllProjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
