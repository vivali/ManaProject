import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TechNeed } from './tech-need.model';
import { TechNeedService } from './tech-need.service';

@Component({
    selector: 'jhi-tech-need-detail',
    templateUrl: './tech-need-detail.component.html'
})
export class TechNeedDetailComponent implements OnInit, OnDestroy {

    techNeed: TechNeed;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private techNeedService: TechNeedService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTechNeeds();
    }

    load(id) {
        this.techNeedService.find(id).subscribe((techNeed) => {
            this.techNeed = techNeed;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTechNeeds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'techNeedListModification',
            (response) => this.load(this.techNeed.id)
        );
    }
}
