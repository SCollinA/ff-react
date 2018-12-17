
import { createStore } from 'redux';

// import uuid from 'uuid/v4';


const defaultState = {
    userSettings: {
        numTeams: 8,
        numDivs: 2,
        numPlayoffTeams: 4
    },
    league: {
        teams: [],
        divisions: []
    },
    schedule: []
}




const MAKE_SCHEDULE = {
    type: 'MAKE_SCHEDULE',
}

const ADD_TEAM = {
    type: 'ADD_TEAM',
}

const ADD_DIVISION = {
    type: 'ADD_DIVISION',
}

const ASSIGN_TEAM = {
    type: 'ASSIGN_TEAM',
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

export const makeSchedule = (userSettings) => {
    return {
        ...MAKE_SCHEDULE,
        userSettings,
    }
}

export const addTeam = (team) => {
    return {
        ...ADD_TEAM,
        team
        // league: {
        //     ...league,
        //     teams: [
        //         ...teams,
        //         team
        //     ]
        // }
    }
}

export const addDivision = () => {
    return {
        ...ADD_DIVISION,
        // league: {
        //     ...league,
        //     divisions: [
        //         ...divisions,
        //         []
        //     ]
        // }
    }
}

export const assignTeam = ({team, divIndex}) => {
    return {
        ...ASSIGN_TEAM,
        // league: {
        //     ...league,
        //     divisions: [
        //         ...divisions.slice(0, divIndex),
        //         [
        //             ...divisions[divIndex],
        //             team
        //         ],
        //         ...divisions.slice(divIndex)
        //     ]
        // }
    }
}

// export 
export const addWeek = () => {
    return {
        ...ADD_WEEK,
        // week: []
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
    switch(action.type) {
        case MAKE_SCHEDULE.type:
            return {
                ...defaultState,
                userSettings: action.userSettings,
            }
        case ADD_TEAM.type:
            return {
                league: {
                    ...league,
                    teams: [
                        ...teams,
                        action.team
                    ]
                }
            }
        case ADD_DIVISION.type:
            return {
                league: {
                    ...state.league,
                    divisions: [
                        ...state.league.divisions,
                        []
                    ]
                }
            }
        case ASSIGN_TEAM.type:
            return {
                league: {
                    ...state.league,
                    divisions: [
                        ...state.league.divisions.slice(0, divIndex),
                        [
                            ...state.league.divisions[divIndex],
                            team
                        ],
                        ...state.league.divisions.slice(divIndex)
                    ]
                }
            }
        case ADD_WEEK.type:
            return {
                schedule: [
                    ...state.schedule,
                    []
                ]
            }
        case DEL_WEEK.type:
            return {
                // remove last week
                schedule: [...state.schedule.slice(0, state.schedule.length - 2)]
            }
        case ADD_GAME.type:
            return {
                // schedule must have one week
                schedule: state.schedule.length > 0 ?
                 [    // every week prior to this week
                    ...state.schedule.slice(0, state.schedule.length - 2),
                    [
                        ...state.schedule[state.schedule.length - 1],
                        action.game
                    ] 
                ] : state.schedule
                    
            }
        case DEL_GAME.type:
            const lastWeek = state.schedule.length > 0 ? state.schedule[state.schedule.length - 1] : []
            return {
                schedule: [
                    // remove last week,
                    ...state.schedule.slice(0, state.schedule.length - 2),
                    // then remove last game
                    lastWeek.slice(0, state.schedule.length - 2)
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
