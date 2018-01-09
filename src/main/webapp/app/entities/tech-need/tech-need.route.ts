import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TechNeedComponent } from './tech-need.component';
import { TechNeedDetailComponent } from './tech-need-detail.component';
import { TechNeedPopupComponent } from './tech-need-dialog.component';
import { TechNeedDeletePopupComponent } from './tech-need-delete-dialog.component';

export const techNeedRoute: Routes = [
    {
        path: 'tech-need',
        component: TechNeedComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techNeed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tech-need/:id',
        component: TechNeedDetailComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techNeed.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const techNeedPopupRoute: Routes = [
    {
        path: 'tech-need-new',
        component: TechNeedPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tech-need/:id/edit',
        component: TechNeedPopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tech-need/:id/delete',
        component: TechNeedDeletePopupComponent,
        data: {
            authorities: ['ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techNeed.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
