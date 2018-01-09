import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FuncNeedComponent } from './func-need.component';
import { FuncNeedDetailComponent } from './func-need-detail.component';
import { FuncNeedPopupComponent } from './func-need-dialog.component';
import { FuncNeedDeletePopupComponent } from './func-need-delete-dialog.component';

export const funcNeedRoute: Routes = [
    {
        path: 'func-need',
        component: FuncNeedComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.funcNeed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'func-need/:id',
        component: FuncNeedDetailComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.funcNeed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const funcNeedPopupRoute: Routes = [
    {
        path: 'func-need-new',
        component: FuncNeedPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.funcNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'func-need/:id/edit',
        component: FuncNeedPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.funcNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'func-need/:id/delete',
        component: FuncNeedDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.funcNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
