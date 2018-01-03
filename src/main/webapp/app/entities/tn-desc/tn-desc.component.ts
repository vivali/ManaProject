import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { TnDesc } from './tn-desc.model';
import { TnDescService } from './tn-desc.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tn-desc',
    templateUrl: './tn-desc.component.html'
})
export class TnDescComponent implements OnInit, OnDestroy {
tnDescs: TnDesc[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tnDescService: TnDescService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tnDescService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tnDescs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTnDescs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TnDesc) {
        return item.id;
    }
    registerChangeInTnDescs() {
        this.eventSubscriber = this.eventManager.subscribe('tnDescListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
