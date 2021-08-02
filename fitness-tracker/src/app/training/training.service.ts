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
  private excercises: Excercise[] = [];

  constructor() { }

  getAvailableExercises() {
    return this.availableExcercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExcercises.find(ex => ex.id === selectedId);
    this.excerciseChanged.next({...this.runningExercise});
  }

  completeExcercise() {
    this.excercises.push({
      ...this.runningExercise, 
      date: new Date(), 
      state: 'completed'
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.excercises.push({
      ...this.runningExercise, 
      duration: this.runningExercise.duration * (progress / 100), 
      calories: this.runningExercise.duration * (progress / 100), 
      date: new Date(), 
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
