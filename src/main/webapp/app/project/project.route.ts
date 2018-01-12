import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CreateProjectComponent } from './project.component';

export const PROJECT_ROUTE: Route = {
    path: 'create_project',
    component: CreateProjectComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'manaProjectApp.project.home.title'
    },
    canActivate: [UserRouteAccessService]
};
