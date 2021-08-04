import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Excercise } from './model/excercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExcercisesChanged = new Subject<Excercise[]>();

  private availableExcercises: Excercise[] = [];
  private runningExercise: Excercise;

  constructor(private firestore: AngularFirestore) { }

  fetchAvailableExercises() {
    this.firestore.collection('availableExcercise').snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          }
        })
      })).subscribe((excercises: Excercise[]) => {
        this.availableExcercises = excercises;
        this.excercisesChanged.next([...this.availableExcercises]);
      })
  }

  startExercise(selectedName: string) {
    this.runningExercise = this.availableExcercises.find(ex => ex.name === selectedName);
    this.excerciseChanged.next({...this.runningExercise});
  }

  completeExcercise() {
    this.addDataToDatabase({
      ...this.runningExercise, 
      date: new Date(), 
      state: 'completed'
    });
    this.runningExercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDatabase({
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

  fetchCompletedOrCancelledExcercises() {
    this.firestore.collection('finishedExcercises').valueChanges().subscribe((excercises: Excercise[]) => {
      this.finishedExcercisesChanged.next(excercises);
    });
  }

  private addDataToDatabase(excercise: Excercise) {
    this.firestore.collection('finishedExcercises').add(excercise);
  }
}
