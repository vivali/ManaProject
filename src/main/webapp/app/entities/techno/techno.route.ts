import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TechnoComponent } from './techno.component';
import { TechnoDetailComponent } from './techno-detail.component';
import { TechnoPopupComponent } from './techno-dialog.component';
import { TechnoDeletePopupComponent } from './techno-delete-dialog.component';

export const technoRoute: Routes = [
    {
        path: 'techno',
        component: TechnoComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'techno/:id',
        component: TechnoDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techno.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const technoPopupRoute: Routes = [
    {
        path: 'techno-new',
        component: TechnoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'techno/:id/edit',
        component: TechnoPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'techno/:id/delete',
        component: TechnoDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.techno.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
