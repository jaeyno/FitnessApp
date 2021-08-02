import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Excercise } from '../model/excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  excercises: Excercise[] = [];

  constructor( private trainingService: TrainingService ) { }

  ngOnInit(): void {
    this.excercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.excercise);
  }

}
