import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Account, LoginModalService, Principal, ResponseWrapper } from '../shared';

import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from 'ng-auto-complete';
import { ProjectComponent, Project, ProjectService } from '../entities/project/index';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {

    @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
    projects: Project[];
    project: Project;
    tab = [];
    public group;
    public selected: any[] = [];
    result;
    account: Account;
    modalRef: NgbModalRef;

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    getProjects() {
         this.projectService.queryForSearch().subscribe(
            (res: ResponseWrapper) => {
                this.projects = res.json;
                this.tab = this.setTable();
                this.group = [
                    CreateNewAutocompleteGroup(
                        'Search...',
                        'completer',
                        this.setTable(),
                        { titleKey: 'title', childrenKey: null }
                    ),
                ];
            },
            (res: ResponseWrapper) => this.onError(res.json)
         );
    }

    setTable(): any {
        const tab = [];
        for (let i = 0; i < this.projects.length; i++) {
            const project: Project = this.projects[i];
            tab.push({ title: project.title, id: project.id })
        }
        return tab;
    }

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private jhiAlertService: JhiAlertService
    ) {
        this.getProjects();
    }

    Selected(item: SelectedAutocompleteItem) {
        this.result = item.item.id;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }
}
