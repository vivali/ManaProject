import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TnDescComponent } from './tn-desc.component';
import { TnDescDetailComponent } from './tn-desc-detail.component';
import { TnDescPopupComponent } from './tn-desc-dialog.component';
import { TnDescDeletePopupComponent } from './tn-desc-delete-dialog.component';

export const tnDescRoute: Routes = [
    {
        path: 'tn-desc',
        component: TnDescComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.tnDesc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tn-desc/:id',
        component: TnDescDetailComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.tnDesc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tnDescPopupRoute: Routes = [
    {
        path: 'tn-desc-new',
        component: TnDescPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.tnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tn-desc/:id/edit',
        component: TnDescPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.tnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tn-desc/:id/delete',
        component: TnDescDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.tnDesc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
