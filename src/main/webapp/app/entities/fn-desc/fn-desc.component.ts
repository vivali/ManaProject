import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { FnDesc } from './fn-desc.model';
import { FnDescService } from './fn-desc.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fn-desc',
    templateUrl: './fn-desc.component.html'
})
export class FnDescComponent implements OnInit, OnDestroy {
fnDescs: FnDesc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fnDescService: FnDescService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fnDescService.query().subscribe(
            (res: ResponseWrapper) => {
                this.fnDescs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFnDescs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FnDesc) {
        return item.id;
    }
    registerChangeInFnDescs() {
        this.eventSubscriber = this.eventManager.subscribe('fnDescListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
