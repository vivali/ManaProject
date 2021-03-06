import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Project, ProjectService } from '../entities/project';
import { TechNeed, TechNeedService } from '../entities/tech-need';
import { TnDesc, TnDescService } from '../entities/tn-desc';
import { FuncNeed, FuncNeedService } from '../entities/func-need';
import { FnDesc, FnDescService } from '../entities/fn-desc';
import { Techno, technoRoute } from '../entities/techno';
import { Version, VersionService } from '../entities/version';
import { Role, RoleService } from '../entities/role';
import { Experience, ExperienceService } from '../entities/experience';
import { PreRelationships, PreRelationshipsService } from '../entities/pre-relationships';

@Injectable()
export class AllProjectPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projectService: ProjectService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.projectService.find(id).subscribe((project) => {
                    this.ngbModalRef = this.allProjectModalRef(component, project);
                    resolve(this.ngbModalRef);
                });
            } else {
                setTimeout(() => {
                    this.ngbModalRef = this.allProjectModalRef(component, new Project(), new FuncNeed(), new FnDesc(), new TechNeed(), new TnDesc(), new Techno(),
                    new Version(), new Role(), new Experience(), new PreRelationships());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    allProjectModalRef(component: Component, project?: Project, funcNeed?: FuncNeed, fnDesc?: FnDesc, techNeed?: TechNeed, tnDesc?: TnDesc, techno?: Techno,
        version?: Version, role?: Role, experience?: Experience, preRelationships?: PreRelationships): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.project = project;
        modalRef.componentInstance.funcNeed = funcNeed;
        modalRef.componentInstance.fnDesc = fnDesc;
        modalRef.componentInstance.techNeed = techNeed;
        modalRef.componentInstance.tnDesc = tnDesc;
        modalRef.componentInstance.techno = techno;
        modalRef.componentInstance.version = version;
        modalRef.componentInstance.role = role;
        modalRef.componentInstance.experience = experience;
        modalRef.componentInstance.preRelationships = preRelationships;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
