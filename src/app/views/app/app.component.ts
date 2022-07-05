import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  constructor(private sidebarService: SidebarService,
    private authService: AuthService,private _router: Router,) {
  }
  ngOnInit() {

    if (!this.authService.getUser())
      return this._router.navigate(['/home']);
    var user = this.authService.authenticatedUser
    if (user == null || (user.expiry && (new Date().getTime() - user.expiry > 7 * 60 * 60 * 1000))) {
      return this.authService.signOut();
    }
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
