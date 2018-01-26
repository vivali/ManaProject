import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Renderer, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Project } from './project.model';
import { ProjectService } from './project.service';

import { Principal } from '../../shared';

import { Chart } from 'chart.js';

@Component({
    selector: 'jhi-project-detail',
    templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy, AfterContentInit {
    @ViewChild('target') elementRef: ElementRef;
    project: Project;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentAccount: any;

    constructor(
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private principal: Principal,
        private renderer: Renderer
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjects();
    }

    ngAfterContentInit() {
        // const ctx = this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'querySelector', ['div']);
        // console.log(ctx);
        // const myPieChart = new Chart(ctx, {
        // type: 'pie',
        // data: {
        //     labels: ['Blue', 'Red', 'Yellow', 'Green'],
        //     datasets: [{
        //     data: [12.21, 15.58, 11.25, 8.32],
        //     backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
        //     }],
        // },
        // });
    }

    load(id) {
        this.projectService.find(id).subscribe((project) => {
            this.project = project;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectListModification',
            (response) => this.load(this.project.id)
        );
    }
}
