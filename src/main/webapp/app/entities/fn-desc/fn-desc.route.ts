import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FnDescComponent } from './fn-desc.component';
import { FnDescDetailComponent } from './fn-desc-detail.component';
import { FnDescPopupComponent } from './fn-desc-dialog.component';
import { FnDescDeletePopupComponent } from './fn-desc-delete-dialog.component';

export const fnDescRoute: Routes = [
    {
        path: 'fn-desc',
        component: FnDescComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.fnDesc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fn-desc/:id',
        component: FnDescDetailComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.fnDesc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fnDescPopupRoute: Routes = [
    {
        path: 'fn-desc-new',
        component: FnDescPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.fnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fn-desc/:id/edit',
        component: FnDescPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.fnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fn-desc/:id/delete',
        component: FnDescDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.fnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
