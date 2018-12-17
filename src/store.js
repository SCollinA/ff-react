
import { createStore } from 'redux';

import uuid from 'uuid/v4';

const defaultState = {
    settings: {
        numWeeks: 14,
        gamesPerWeek: 6,
        numDivs: 2,
        teamsPerDiv: 6,
        maxNonDivGames: 4,
        maxHomeAwayGames: 7,
    },
    weeks: [ // schedule is list of weeks
        // {
        //     id: uuid(),
        //     games: [ // weeks are lists of games
        //         {   // games are two teams
        //             id: uuid(),
        //             homeTeam: {
        //                 id: uuid(),
        //                 name: 'HomeTeam'
        //             },
        //             awayTeam: {
        //                 id: uuid(),
        //                 name: 'AwayTeam'
        //             }
        //         }
        //     ]
        // }
    ],
    divisions: [
        // {
        //     id: uuid(),
        //     teams: [
        //         {
        //             id: uuid(),
        //             name: 'divTeam'
        //         }
        //     ]
        // }
    ],
    teams: [
        // {
        //     id: uuid(),
        //     name: 'sampleTeam'
        // }
    ],
    games: [
        // {
        //     id: uuid(),
        //     homeTeam: {
        //         id: uuid(),
        //         name: 'HomeTeam'
        //     },
        //     awayTeam: {
        //         id: uuid(),
        //         name: 'AwayTeam'
        //     }
        // }
    ]

}

// consts
const STORE_SETTINGS = {
    type: 'STORE_SETTINGS'
}

const ADD_DIVISION = {
    type: 'ADD_DIVISION'
}

const ADD_TEAM = {
    type: 'ADD_TEAM'
}

const ASSIGN_TEAM = {
    type: 'ASSIGN_TEAM'
}

const ADD_GAME = {
    type: 'ADD_GAME'
}

const ASSIGN_GAME = {
    type: 'ASSIGN_GAME'
}

// exports
export const storeSettings = (settings) => {
    return {
        ...STORE_SETTINGS,
        settings
    }
}

export const addDivision = () => {
    return {
        ...ADD_DIVISION,
        newDivision: {
            id: uuid(),
            teams: []
        }
    }
}

export const addTeam = (teamName) => {
    return {
        ...ADD_TEAM,
        newTeam: {
            id: uuid(),
            name: teamName
        }
    }
}

export const assignTeam = (team, division) => {
    return {
        ...ASSIGN_TEAM,
        team,
        division
    }
}

export const addGame = (homeTeam, awayTeam) => {
    return {
        ...ADD_GAME,
        game: {
            id: uuid(),
            homeTeam,
            awayTeam
        }
    }
}

export const assignGame = (game, week) => {
    return {
        ...ASSIGN_GAME,
        game,
        week
    }
}
//Reducer

const game = (state=defaultState, action) => {
    if (!action) {
        return state;
    }
    switch(action.type) {
        case STORE_SETTINGS.type:
            return {
                settings: action.settings
            }
        case ADD_DIVISION.type:
            return {
                divisions: [
                    ...state.divisions,
                    action.newDivision
                ]
            }
        case ADD_TEAM.type:
            return {
                teams: [
                    ...state.teams,
                    action.newTeam
                ]
            }
        case ASSIGN_TEAM.type:
            return {
                divisions: state.divisions.map(division => {
                    if (division.id === action.division.id) {
                        return {
                            ...division,
                            teams: [
                                ...division.teams,
                                action.team
                            ]
                        }
                    } else {
                        return division
                    }
                })
            }
        case ADD_GAME.type:
            return {
                games: [
                    ...state.games,
                    action.game
                ]
            }
        case ASSIGN_GAME.type:
            return {
                schedule: state.schedule.map(week => {
                    if (week.id === action.week.id) {
                        return {
                            ...week,
                            games: [
                                ...state.games,
                                action.game
                            ]
                        }
                    } else {
                        return week
                    }
                })
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
