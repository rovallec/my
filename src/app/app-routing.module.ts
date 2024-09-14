import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { WfmFormComponent } from './wfm-form/wfm-form.component';
import { MsalGuard } from '@azure/msal-angular';  // Import MSAL guard for route protection

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] }, // Protect this route
  { path: 'wfmForm', component: WfmFormComponent, canActivate: [MsalGuard] }, // Protect this route
  { path: '', redirectTo: '/profile', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/profile' }  // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
