import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveExcercise).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExcercise();
          clearInterval(this.timer);
        }
      }, step);
    })
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExcercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
