import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Excercise } from '../model/excercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises$: Observable<Excercise[]>;
  subscription: Subscription[] = [];
  isLoading$: Observable<boolean>;

  constructor( 
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.fetchExcercises();
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.excercises$ = this.store.select(fromTraining.getAvailableExcercises);
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
