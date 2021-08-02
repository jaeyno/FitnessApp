import { Injectable } from '@angular/core';
import { Excercise } from './model/excercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExcercises: Excercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 110},
    { id: 'burpee', name: 'Burpee', duration: 60, calories: 80}
  ];

  constructor() { }

  getAvailableExcerices() {
    return this.availableExcercises.slice();
  }
}
