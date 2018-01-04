import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RoleComponent } from './role.component';
import { RoleDetailComponent } from './role-detail.component';
import { RolePopupComponent } from './role-dialog.component';
import { RoleDeletePopupComponent } from './role-delete-dialog.component';

export const roleRoute: Routes = [
    {
        path: 'role',
        component: RoleComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'role/:id',
        component: RoleDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.role.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rolePopupRoute: Routes = [
    {
        path: 'role-new',
        component: RolePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role/:id/edit',
        component: RolePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'role/:id/delete',
        component: RoleDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_PMANAGER'],
            pageTitle: 'manaProjectApp.role.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
