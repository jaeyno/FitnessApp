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
  subscription: Subscription = new Subscription();

  constructor( 
    private trainingService: TrainingService, 
  ) { }

  ngOnInit(): void {
    this.trainingService.fetchAvailableExercises();

    this.subscription.add(this.trainingService.excercisesChanged.subscribe(excercise => {
      this.excercises = excercise;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    console.log(form.value.excercise);
    this.trainingService.startExercise(form.value.excercise);
  }

}
