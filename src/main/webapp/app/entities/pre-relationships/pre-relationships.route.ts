import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PreRelationshipsComponent } from './pre-relationships.component';
import { PreRelationshipsDetailComponent } from './pre-relationships-detail.component';
import { PreRelationshipsPopupComponent } from './pre-relationships-dialog.component';
import { PreRelationshipsDeletePopupComponent } from './pre-relationships-delete-dialog.component';

export const preRelationshipsRoute: Routes = [
    {
        path: 'pre-relationships',
        component: PreRelationshipsComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.preRelationships.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pre-relationships/:id',
        component: PreRelationshipsDetailComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.preRelationships.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const preRelationshipsPopupRoute: Routes = [
    {
        path: 'pre-relationships-new',
        component: PreRelationshipsPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.preRelationships.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pre-relationships/:id/edit',
        component: PreRelationshipsPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.preRelationships.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pre-relationships/:id/delete',
        component: PreRelationshipsDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.preRelationships.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
