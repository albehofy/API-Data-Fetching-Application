import { Routes } from '@angular/router';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { AllUsersComponent } from './Components/all-users/all-users.component';

export const routes: Routes = [
    { path: '', component: AllUsersComponent },
    { path: 'users', component: AllUsersComponent },
    { path: 'user/:id', component: UserDetailsComponent }
];
