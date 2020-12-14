import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';
import { AppConfig } from '@shared/constants';
import { DialogService } from '@shared/services';
import { LoginComponent } from 'app/layouts/auth/components/login/login.component';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() title: string;
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor(
    public authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {}

  showLogin() {
    if (this.authService.isLoggedOut()) {
      this.dialogService.showComponent(
        LoginComponent,
        {},
        AppConfig.DefaultLoginDialogWidth
      ).toPromise().then(()=>{
        this.router.navigateByUrl("/editor");
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  toggleSideBar() {
    this.toggle.emit();

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
