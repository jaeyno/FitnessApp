import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Excercise } from './model/excercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<Excercise>();

  private availableExcercises: Excercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 110},
    { id: 'burpee', name: 'Burpee', duration: 60, calories: 80}
  ];

  private runningExercise: Excercise;

  constructor() { }

  getAvailableExercises() {
    return this.availableExcercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
    this.excerciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
