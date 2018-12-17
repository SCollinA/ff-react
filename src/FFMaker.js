import store, * as actions from './store'

export default function makeSchedule(userSettings) {
    resetSchedule()
    storeSettings(userSettings)
    setupLeague()
    assignDivGames()
    // find div games
    // assign games to schedule
    assignNonDivGames()
    // find non-div games
    // find home-away-compliant games
    // assign to schedule
}

function resetSchedule() {
    store.dispatch(actions.resetSchedule())
}

// MAKE SCHEDULE
function storeSettings({numTeams, numDivs, numPlayoffTeams}) {
    const numWeeks = findNumWeeks(numPlayoffTeams)
    const gamesPerWeek = numTeams / 2
    const teamsPerDiv = numTeams / numDivs
    const maxNonDivGames = numWeeks - ((teamsPerDiv - 1) * 2)
    const maxHomeAwayGames = Math.ceil(numWeeks / 2)
    store.dispatch(actions.storeSettings({numWeeks, numTeams, gamesPerWeek, numDivs, teamsPerDiv, maxNonDivGames, maxHomeAwayGames}))
}

function findNumWeeks(numPlayoffTeams) {
    let numPlayoffWeeks = 0
    while (numPlayoffTeams > 1) {
        numPlayoffTeams /= 2
        numPlayoffWeeks++
    }
    return 16 - numPlayoffWeeks
}

function setupLeague() {
    const {settings} = store.getState()
    addDivisions(settings.numDivs)
    addTeams(settings.numTeams)
    assignTeams(settings.teamsPerDiv)
    addGames()
}

function assignDivGames() {
    // get all the div games
    let divGames = findDivGames()
    // get all the weeks
    let {settings, weeks} = store.getState()
    // assign each one to schedule until none remain
    while (divGames.length > 0) {
        const randomGameIndex = Math.floor(Math.random() * divGames.length)
        // pick and remove random game
        const game = divGames.splice(randomGameIndex, 1)
        // pick a random week
        const randomWeekIndex = Math.floor(Math.random() * weeks.length)
        const week = weeks[randomWeekIndex]
        assignGame(game, week)
        // update weeks and filter for incomplete weeks
        weeks = store.getState().weeks.filter(week => week.length < settings.gamesPerWeek)
    }
}

function findDivGames() {
    return []
}

function assignNonDivGames() {

}

function assignGame(game, week) {
    store.dispatch(actions.assignGame(game, week))
}

// SETUP LEAGUE
function addDivisions(numDivs) {
    for (let i = 0; i < numDivs; i++) {
        // add divs to league
        addDivision()
    }
}

function addDivision() {
    store.dispatch(actions.addDivision())
}

function addTeams(numTeams) {
    const teamNames = []
    for (let i = 0; i < numTeams; i++) {
        teamNames.push(`Team ${i}`)
    }
    teamNames.forEach(teamName => addTeam(teamName))
}

function addTeam(teamName) {
    store.dispatch(actions.addTeam(teamName))
}

function assignTeams(teamsPerDiv) {
    let {divisions, teams} = store.getState()
    // make copy of teams
    let unassignedTeams = teams.slice()
    // for each division
    for (let i = 0; i < divisions.length; i++) {
        let division = divisions[i]
        // while division is not full
        while (division.teams.length < teamsPerDiv) {
            // assign random team to division
            const team = unassignedTeams.splice(Math.floor(Math.random() * unassignedTeams.length), 1)
            assignTeam(team, division)
            // update division
            divisions = store.getState().divisions
            division = divisions[i]
        }
    }
}

function assignTeam(team, division) {
    store.dispatch(actions.assignTeam(team, division))
}

function addGames() {
    const {teams} = store.getState()
    for (let i = 0; i < teams.length; i++) {
        const homeTeam = teams[i]
        for (let j = 0; j < teams.length; j++) {
            const awayTeam = teams[j]
            if (homeTeam.id !== awayTeam.id) {
                addGame(homeTeam, awayTeam)
            }
        }
    }
}

function addGame(homeTeam, awayTeam) {
    store.dispatch(actions.addGame(homeTeam, awayTeam))
}