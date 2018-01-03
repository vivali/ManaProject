import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Techno } from './techno.model';
import { TechnoService } from './techno.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-techno',
    templateUrl: './techno.component.html'
})
export class TechnoComponent implements OnInit, OnDestroy {
technos: Techno[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private technoService: TechnoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.technoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.technos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTechnos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Techno) {
        return item.id;
    }
    registerChangeInTechnos() {
        this.eventSubscriber = this.eventManager.subscribe('technoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
