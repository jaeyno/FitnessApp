import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Excercise } from '../model/excercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  excercises$: Observable<any>;

  constructor( 
    private trainingService: TrainingService, 
    private firestore: AngularFirestore 
  ) { }

  ngOnInit(): void {
    this.excercises$ = this.firestore.collection('availableExcercise').valueChanges()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.excercise);
  }

}
