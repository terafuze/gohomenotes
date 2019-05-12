import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';
import { DeleteUserProfilePopupComponent } from './delete-user-profile.component';
import { EditUserProfileComponent } from './edit-user-profile.component';
import { ListUserProfilesComponent } from './list-user-profiles.component';
import { ViewUserProfileComponent } from './view-user-profile.component';

@Injectable({ providedIn: 'root' })
export class UserProfileResolve implements Resolve<IUserProfile> {
    constructor(private service: UserProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((userProfile: HttpResponse<UserProfile>) => userProfile.body));
        }
        return of(new UserProfile());
    }
}

export const userProfileRoute: Routes = [
    {
        path: 'user-profiles/new',
        component: EditUserProfileComponent,
        resolve: {
            userProfile: UserProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.userProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-profiles',
        component: ListUserProfilesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.userProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-profiles/:id/view',
        component: ViewUserProfileComponent,
        resolve: {
            userProfile: UserProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.userProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'user-profiles/:id/edit',
        component: EditUserProfileComponent,
        resolve: {
            userProfile: UserProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.userProfile.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userProfilePopupRoute: Routes = [
    {
        path: 'user-profile/:id/delete',
        component: DeleteUserProfilePopupComponent,
        resolve: {
            userProfile: UserProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.userProfile.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];