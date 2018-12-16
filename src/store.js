
import { createStore } from 'redux';
import ffScheduleMaker from './FFScheduleMaker';

// import uuid from 'uuid/v4';


const defaultState = {
    schedule: []
}

const MAKE_SCHEDULE = {
    type: 'MAKE_SCHEDULE',
}

const ADD_WEEK = {
    type: 'ADD_WEEK',
}

const DEL_WEEK = {
    type: 'DEL_WEEK'
}

const ADD_GAME = {
    type: 'ADD_GAME',
};

const DEL_GAME = {
    type: 'DEL_GAME',
}

export const makeSchedule = (scheduleInfo) => {
    console.log('in the stores make schedule')
    ffScheduleMaker(scheduleInfo)
    return {
        ...MAKE_SCHEDULE,
        schedule: []
    }
}

// export 
export const addWeek = () => {
    return {
        ...ADD_WEEK,
        week: []
    }
}

// export 
export const deleteWeek = () => {
    return {
        ...DEL_WEEK
    }
}

// export 
export const addGame = (game) => {
    return {
        ...ADD_GAME,
        game
    };
};

// export 
export const deleteGame = () => {
    return {
        ...DEL_GAME,
    }
}


//Reducer

const game = (state=defaultState, action) => {
    if (!action) {
        return state;
    }
    const lastWeek = state.schedule.length > 0 ? state.schedule[state.schedule.length - 1] : []
    switch(action.type) {
        case MAKE_SCHEDULE.type:
            return {
                schedule: action.schedule
            }
        case ADD_WEEK.type:
            return {
                schedule: [
                    ...state.schedule,
                    action.week
                ]
            }
        // case DEL_WEEK.type:
        //     return {
        //         // remove last week
        //         schedule: [...state.schedule.slice(0, state.schedule.length - 2)]
        //     }
        case ADD_GAME.type:
            return {
                // schedule must have one week
                schedule: state.schedule.length > 0 ?
                 [    // every week prior to this week
                    ...state.schedule.slice(0, state.schedule.length - 2),
                    [   // every game prior to this game
                        ...lastWeek,
                        action.game
                    ] 
                ] : state.schedule
                    
            }
        case DEL_GAME.type:
            return {
                schedule: [
                    // remove last week,
                    ...state.schedule.slice(0, state.schedule.length - 2),
                    // then remove last game
                    lastWeek.slice(0, lastWeek.length - 2)
                ]
            }
        default:
            return state;
    }
}

const store = createStore(
    game,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => console.log(store.getState()))

export default store;
