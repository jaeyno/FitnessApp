import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  onGoingTraining: boolean = false;
  subscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.subscription = this.trainingService.excerciseChanged.subscribe(ex => {
      if (ex) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    })
  }

}
