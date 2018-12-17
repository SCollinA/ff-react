import store, * as actions from './store'

export default function makeSchedule(userSettings) {
    resetSchedule()
    storeSettings(userSettings)
    setupLeague()
    assignGames()
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
    addWeeks(settings.numWeeks)
    addGames()
}

async function assignGames() {
    // find div games
    // find non-div games
    const {divGames, nonDivGames} = findAllGames()
    // assign games to schedule
    assignDivGames(divGames)
    // assign to schedule
    assignNonDivGames(nonDivGames)
}

function assignDivGames(divGames) {
    // get all the weeks
    let {settings, weeks} = store.getState()
    // assign each one to schedule until none remain
    while (divGames.length > 0) {
        const randomGameIndex = Math.floor(Math.random() * divGames.length)
        // pick and remove random game
        const game = divGames.splice(randomGameIndex, 1)[0]
        // pick a random week
        const randomWeekIndex = Math.floor(Math.random() * weeks.length)
        const week = weeks[randomWeekIndex]
        assignGame(game, week)
        // update weeks and filter for incomplete weeks
        weeks = store.getState().weeks.filter(week => week.games.length < settings.gamesPerWeek)
    }
}

function findAllGames() {
    const {games} = store.getState()
    const divGames = []
    const nonDivGames = []
    for (let i = 0; i < games.length; i++) {
        const game = games[i]
        const {homeTeam, awayTeam} = game
        if (homeTeam.div_id === awayTeam.div_id) {
            divGames.push(game)
        } else {
            nonDivGames.push(game)
        }
    }
    return {divGames, nonDivGames}
}

function assignNonDivGames(nonDivGames) {
    // console.log(nonDivGames)
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
            const team = unassignedTeams.splice(Math.floor(Math.random() * unassignedTeams.length), 1)[0]
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

function addWeeks(numWeeks) {
    for (let i = 0; i < numWeeks; i++) {
        addWeek()
    }
}

function addWeek() {
    store.dispatch(actions.addWeek())
}

function addGames() {
    const {teams} = store.getState()
    for (let i = 0; i < teams.length; i++) {
        const homeTeam = teams[i]
        for (let j = 0; j < teams.length; j++) {
            const awayTeam = teams[j]
            if (homeTeam.id !== awayTeam.id) {
                addGame(homeTeam, awayTeam)
                // addGame(awayTeam, homeTeam)
            }
        }
    }
}

function addGame(homeTeam, awayTeam) {
    store.dispatch(actions.addGame(homeTeam, awayTeam))
}