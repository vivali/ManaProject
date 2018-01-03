import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { TechNeed } from './tech-need.model';
import { TechNeedService } from './tech-need.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tech-need',
    templateUrl: './tech-need.component.html'
})
export class TechNeedComponent implements OnInit, OnDestroy {
techNeeds: TechNeed[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private techNeedService: TechNeedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.techNeedService.query().subscribe(
            (res: ResponseWrapper) => {
                this.techNeeds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTechNeeds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TechNeed) {
        return item.id;
    }
    registerChangeInTechNeeds() {
        this.eventSubscriber = this.eventManager.subscribe('techNeedListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
