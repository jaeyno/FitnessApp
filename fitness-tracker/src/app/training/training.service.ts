import { Store } from '@ngrx/store';
import { UiService } from './../shared/ui.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Excercise } from './model/excercise.model';
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private subscription: Subscription[] = [];

  excerciseChanged = new Subject<Excercise>();
  excercisesChanged = new Subject<Excercise[]>();
  finishedExcercisesChanged = new Subject<Excercise[]>();

  constructor(
    private firestore: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) { }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.subscription.push(this.firestore.collection('availableExcercise').snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          }
        })
      })).subscribe((excercises: Excercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(excercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Excercises failed, please try again later', null, 3000);
        this.excercisesChanged.next(null);
      }))
  }

  startExercise(selectedName: string) {
    this.store.dispatch(new Training.StartTraining(selectedName));
  }

  completeExcercise() {
    this.store.select(fromTraining.getActiveExcercise).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex, 
        date: new Date(), 
        state: 'completed'
      });
    })
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExcercise(progress: number) {
    this.store.select(fromTraining.getActiveExcercise).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex, 
        duration: ex.duration * (progress / 100), 
        calories: ex.calories * (progress / 100), 
        date: new Date(), 
        state: 'cancelled'
      });
    })
    this.store.dispatch(new Training.StopTraining());
  }

  fetchCompletedOrCancelledExcercises() {
    this.subscription.push(this.firestore.collection('finishedExcercises').valueChanges().subscribe((excercises: Excercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(excercises));
    }, error => {
      console.log(error);
    }))
  }

  cancelSubscriptions() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(excercise: Excercise) {
    this.firestore.collection('finishedExcercises').add(excercise);
  }
}
