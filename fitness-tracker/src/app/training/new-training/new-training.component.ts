import { Store } from '@ngrx/store';
import { UiService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Excercise } from '../model/excercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[];
  subscription: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor( 
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.fetchExcercises();

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // this.subscription.push(this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // }))

    this.subscription.push(this.trainingService.excercisesChanged.subscribe(excercise => {
      this.excercises = excercise;
    }));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.excercise);
  }

  fetchExcercises() {
    this.trainingService.fetchAvailableExercises();
  }

}
