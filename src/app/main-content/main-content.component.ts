import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
})
export class MainContentComponent implements OnInit {

  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then((result) => {
      if (result !== null && result.account !== null) {
        this.msalService.instance.setActiveAccount(result.account);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
