import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionService } from './version.service';

import { Principal } from '../../shared';

@Component({
    selector: 'jhi-version-detail',
    templateUrl: './version-detail.component.html'
})
export class VersionDetailComponent implements OnInit, OnDestroy {

    version: Version;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentAccount: any;

    constructor(
        private eventManager: JhiEventManager,
        private versionService: VersionService,
        private route: ActivatedRoute,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVersions();
    }

    load(id) {
        this.versionService.find(id).subscribe((version) => {
            this.version = version;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVersions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'versionListModification',
            (response) => this.load(this.version.id)
        );
    }
}
