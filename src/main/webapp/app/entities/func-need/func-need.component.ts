import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FuncNeed } from './func-need.model';
import { FuncNeedService } from './func-need.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-func-need',
    templateUrl: './func-need.component.html'
})
export class FuncNeedComponent implements OnInit, OnDestroy {
funcNeeds: FuncNeed[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private funcNeedService: FuncNeedService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.funcNeedService.query().subscribe(
            (res: ResponseWrapper) => {
                this.funcNeeds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFuncNeeds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FuncNeed) {
        return item.id;
    }
    registerChangeInFuncNeeds() {
        this.eventSubscriber = this.eventManager.subscribe('funcNeedListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
