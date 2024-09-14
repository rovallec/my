import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalModule, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the components
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { WfmFormComponent } from './wfm-form/wfm-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    MainContentComponent,
    NavbarComponent,
    ProfileComponent,
    WfmFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'a3b8fa38-1784-4596-83b9-a9723ea833bf',  // Your APIID (Client ID)
        authority: 'https://login.microsoftonline.com/493d3197-02bf-4b92-92a0-9c847aaea65c',  // Your Tenant ID
        redirectUri: 'http://localhost:4200/',  // Redirect URI
      },
      cache: {
        cacheLocation: 'localStorage', // You can set this to 'sessionStorage' if preferred
        storeAuthStateInCookie: true
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
