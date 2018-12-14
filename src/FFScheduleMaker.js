import store, * as actions from './store'

export default function ffScheduleMaker(numWeeks) {
    return []
}

function addWeek() {
    store.dispatch(actions.addWeek())
}

function deleteWeek() {
    store.dispatch(actions.deleteWeek())
}

function addGame(game) {
    store.dispatch(actions.addGame(game))
}

function deleteGame() {
    store.dispatch(actions.deleteGame())
}