import { UiService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Excercise } from '../model/excercise.model';
import { TrainingService } from '../training.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[];
  subscription: Subscription[] = [];
  isLoading: boolean = true;

  constructor( 
    private trainingService: TrainingService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();

    this.subscription.push(this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }))

    this.subscription.push(this.trainingService.excercisesChanged.subscribe(excercise => {
      this.excercises = excercise;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.excercise);
  }

}
