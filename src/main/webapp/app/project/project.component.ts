import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';

import { CreateNewAutocompleteGroup, SelectedAutocompleteItem, NgAutocompleteComponent } from 'ng-auto-complete';
import { ProjectComponent } from '../entities/project/index';

@Component({
    selector: 'jhi-create-project',
    templateUrl: './project.component.html',
    styleUrls: [
        'project.scss'
    ]

})
export class CreateProjectComponent implements OnInit {

    @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;

    public group = [
        CreateNewAutocompleteGroup(
            'Search / choose in / from list',
            'completer',
            [
                { title: 'Option 1', id: '1' },
                { title: 'Option 2', id: '2' },
                { title: 'Option 3', id: '3' },
                { title: 'Option 4', id: '4' },
                { title: 'Option 5', id: '5' },
            ],
            { titleKey: 'title', childrenKey: null }
        ),
    ];

    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private projectCompo: ProjectComponent,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    Selected(item: SelectedAutocompleteItem) {
        console.log(item);
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

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
