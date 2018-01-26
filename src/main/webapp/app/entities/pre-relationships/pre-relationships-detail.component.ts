import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { PreRelationships } from './pre-relationships.model';
import { PreRelationshipsService } from './pre-relationships.service';

import { Principal } from '../../shared';

@Component({
    selector: 'jhi-pre-relationships-detail',
    templateUrl: './pre-relationships-detail.component.html'
})
export class PreRelationshipsDetailComponent implements OnInit, OnDestroy {

    preRelationships: PreRelationships;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentAccount: any;

    constructor(
        private eventManager: JhiEventManager,
        private preRelationshipsService: PreRelationshipsService,
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
        this.registerChangeInPreRelationships();
    }

    load(id) {
        this.preRelationshipsService.find(id).subscribe((preRelationships) => {
            this.preRelationships = preRelationships;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPreRelationships() {
        this.eventSubscriber = this.eventManager.subscribe(
            'preRelationshipsListModification',
            (response) => this.load(this.preRelationships.id)
        );
    }
}
