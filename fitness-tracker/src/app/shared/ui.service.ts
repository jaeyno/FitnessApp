import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  //loadingStateChanged = new Subject<boolean>();

  constructor(private snackBarService: MatSnackBar) { }

  showSnackbar(message, action, duration) {
    this.snackBarService.open(message, action, {
      duration: duration
    });
  }
}
