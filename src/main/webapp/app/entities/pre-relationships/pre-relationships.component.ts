import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { PreRelationships } from './pre-relationships.model';
import { PreRelationshipsService } from './pre-relationships.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pre-relationships',
    templateUrl: './pre-relationships.component.html'
})
export class PreRelationshipsComponent implements OnInit, OnDestroy {
preRelationships: PreRelationships[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private preRelationshipsService: PreRelationshipsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.preRelationshipsService.query().subscribe(
            (res: ResponseWrapper) => {
                this.preRelationships = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPreRelationships();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PreRelationships) {
        return item.id;
    }
    registerChangeInPreRelationships() {
        this.eventSubscriber = this.eventManager.subscribe('preRelationshipsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
