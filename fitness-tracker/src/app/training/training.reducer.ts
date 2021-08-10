import { Excercise } from "./model/excercise.model";
import { TrainingActions, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, SET_AVAILABLE_TRAININGS } from "./training.actions";
import * as fromRoot from '../app.reducer';

export interface TrainingState {
    availableExcercises: Excercise[];
    finishedExcercises: Excercise[];
    activeExcercises: Excercise[];
};

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExcercises: [],
    finishedExcercises: [],
    activeExcercises: null,
};

export function authReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExcercises: action.payload
            }
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExcercises: action.payload
            }
        case START_TRAINING:
            return {
                ...state,
                activeExcercises: action.payload
            }
        case STOP_TRAINING:
            return {
                ...state,
                activeExcercises: null
            }
        default:
            return state;
    }
}

export const getAvailableExcercises = (state: TrainingState) => state.availableExcercises;
export const getFinishedExcercises = (state: TrainingState) => state.finishedExcercises;
export const getActiveExcercise = (state: TrainingState) => state.activeExcercises;