import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AllProjectComponent } from './all-project.component';
import { AllProjectDetailComponent } from './all-project-detail.component';
import { AllProjectPopupComponent } from './all-project-dialog.component';
import { AllProjectDeletePopupComponent } from './all-project-delete-dialog.component';

export const allProjectRoute: Routes = [
    {
        path: 'allproject',
        component: AllProjectComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'manaProjectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aproject/:id',
        component: AllProjectDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'manaProjectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const allProjectPopupRoute: Routes = [
    {
        path: 'aproject-new',
        component: AllProjectPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aproject/:id/edit',
        component: AllProjectPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aproject/:id/delete',
        component: AllProjectDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.project.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
