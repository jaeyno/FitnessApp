import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void> ();
  isAuth$: Observable<boolean>;

  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.subscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

}
