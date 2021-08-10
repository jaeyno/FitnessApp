import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private snackBarService: MatSnackBar) { }

  showSnackbar(message, action, duration) {
    this.snackBarService.open(message, action, {
      duration: duration
    });
  }
}
