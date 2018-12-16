import store, * as actions from './store'

let recursionCounter = 0

export default function ffScheduleMaker({numTeams, numDivs, numPlayoffTeams}) {
    console.log('in the schedule maker')
    // get a copy of the schedule
    const {schedule} = store.getState()
    // remove old weeks
    deleteWeeks(schedule)
    // add weeks to schedule
    addWeeks(numTeams, numPlayoffTeams)
    // make array of generic team names
    const teams = makeTeams(numTeams)
    // make random divisions
    const divisions = makeDivisions(numDivs, teams)
    const league = {teams, divisions}
    return addNextGame(league)
}

function deleteWeeks() {
    const {schedule} = store.getState()
    console.log('deleting weeks')
    // for each week
    for (let i = 0; i < schedule.length; i++) {
        // remove week
        store.dispatch(deleteWeek())
    }
}

function addWeeks(numTeams, numPlayoffTeams) {
    // find weeks in regular season
    const numWeeks = 16 - playoffWeeks(numPlayoffTeams)
    // add weeks to schedule
    console.log('adding weeks')
    for (let i = 0; i < numWeeks; i++) {
        addWeek()
    }
}

// calculate number of weeks for playoffs
function playoffWeeks(numPlayoffTeams) {
    console.log('calculating playoff weeks')
    let playoffWeeks = 0
    while (numPlayoffTeams > 1) {
        numPlayoffTeams /= 2
        playoffWeeks++
    }
    return playoffWeeks
}

// make array of generic team names
function makeTeams(numTeams) {
    console.log('making new teams')
    const teams = []
    while (numTeams > 0) {
        teams.unshift(`Team ${numTeams}`)
        numTeams--
    }
    return teams
}

// make random divisions
function makeDivisions(numDivs, originalTeams) {
    console.log('making divisions')
    // make new divisions list
    const divisions = makeDivisionsList(numDivs)
    return assignTeams(divisions, originalTeams)
}

function makeDivisionsList(numDivs) {
    console.log('making divisions list')
    // make new divisions list
    let divisions = []
    // add empty divisions
    while (numDivs > 0) {
        divisions.push([])
        numDivs--
    }
    return divisions
}

function assignTeams(divisions, originalTeams) {
    console.log('assigning teams')
    const teamsPerDiv = originalTeams.length / divisions.length
    // make a copy of the teams array
    const teams = originalTeams.slice()
    // until all teams are added
    while (teams.length > 0) {
        // get a random team
        const randomTeamIndex = Math.floor(Math.random() * teams.length)
        const randomTeam = teams.splice(randomTeamIndex, 1)[0]
        // get a random division
        let randomDivIndex = Math.floor(Math.random() * divisions.length)
        // check division fill level
        while (divisions[randomDivIndex].length === teamsPerDiv) {
            // if full pick a new index
            randomDivIndex = Math.floor(Math.random() * divisions.length)
        }
        // if division is not full
        if (divisions[randomDivIndex].length < teamsPerDiv) {
            // add team to division
            divisions[randomDivIndex].push(randomTeam)
        } else {
            
        }
    }
    return divisions
}

// this is the recursive function
function addNextGame(league) {
    recursionCounter = 0
    console.log(`beginning recursion level ${++recursionCounter}`)
    const {schedule} = store.getState()
    const {teams, divisions} = league
    // go through each week
    for (let i = 0; i < schedule.length; i++) {
        console.log('inside week')
        const week = schedule[i]
        // keep track of checked games by the week
        const checkedGames = []
        // while the week isn't full of games
        while (week.length < teams.length / 2) {
            console.log('inside gamepicker')
            // pick a random game
            const randomGame = randomGame(league)
            // check it
            checkedGames.push(randomGame)
            // add it
            addGame(randomGame)
            // check schedule 
            if (scheduleIsGood(league)) {
                console.log('good game')
                // keep going
                return addNextGame(league)
            } else {
                console.log('bad game')
                // remove game
                deleteGame()
                // report bad path
                return false
            }
        }
    }

    return schedule
}

function randomGame(league) {
    let {teams, divisions} = league
    const allGames = allGames(teams)
    const scheduledGames = scheduledGames()
    const unscheduledGames = []
    // for each possible game
    allGames.forEach(game => { 
        // if it is NOT already scheduled
        if (!scheduledGames.includes(game)) {
            // add it to unscheduled games
            unscheduledGames.push(game)
        }
    })
    // pick one of the unscheduled games randomly
    return unscheduledGames[Math.floor(Math.random() * unscheduledGames.length)]
}

function allGames(teams) {
    const allGamesArray = []
    // take each team
    for (let i = 0; i < teams.length; i++) {
        // make a game
        const game = []
        // push to game
        game.push(teams[i])
        // take each other team
        for (let j = 0; j < teams.length; j++) {
            if (teams[j] !== game[0]) {
                // push to game
                game.push(teams[j])
                allGamesArray.push(game.slice())
                game.pop()
            }
        }
        // push to all games array
    }
    return allGamesArray
}

function scheduledGames() {
    const {schedule} = store.getState()
    const scheduledGamesArray = []
    for (let i = 0; i < schedule.length; i++) {
        const week = schedule[i]
        for (let j = 0; j < week.length; j++) {
            scheduledGamesArray.push(week[j])
        }
    }
    return scheduledGamesArray
}

function scheduleIsGood(league) {
    // if teams do NOT have less than max home/away games
    if (!homeAwayCompliant(league)) {
        return false
    // if teams do NOT have less than max non-div games
    } else if (!nonDivCompliant(league)) {
        return false
    }
    return true
}

function homeAwayCompliant({teams}) {
    const {schedule} = store.getState()
    // max is length of schedule / 2 rounded up
    const maxHomeAwayGames = Math.ceil(schedule.length / 2)
    // for each team
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i]
        let homeCount = 0
        let awayCount = 0
        // for each week
        for (let j = 0; j < schedule.length; j++) {
            const week = schedule[j]
            // for each game
            for (let k = 0; k < week.length; k++) {
                const game = schedule[k]
                // if home game
                if (game[0] === team) {
                    // increment home count
                    homeCount++
                    // if away game
                } else if (game[1] === team) {
                    // increment away count
                    awayCount++
                }                
                // if either is above max
                if (homeCount > maxHomeAwayGames || awayCount > maxHomeAwayGames) {
                    return false
                }
            }
        }
    }
    return true
}

function nonDivCompliant({teams, divisions}) {
    const {schedule} = store.getState()
    const maxNonDivGames = 0
    let nonDivGames = 0
    // for each team
    for (let i = 0; i < teams.length; i++) {
        // for each week
        for (let j = 0; j < schedule.length; j++) {
            const week = schedule[j]
            // for each game
            for (let k = 0; k < week.length; k++) {
                const game = week[k]
                // if game is divisional
                if (gameIsDivisional(game, divisions)) {
                    // increment divGame count
                    nonDivGames++
                }
                // if nonDivGame count greater than maxNonDivGames
                if (nonDivGames > maxNonDivGames) {
                    return false
                }
            }
        }
    }
    return true
}

function gameIsDivisional(game, divisions) {
    const homeTeam = game[0]
    const awayTeam = game[1]
    // for each division
    for (let i = 0; i < divisions.length; i++) {
        const division = divisions[i]
        // if home team is in division and away team is in division
        if (division.includes(homeTeam) && division.includes(awayTeam)) {
            return true
        }
    }
    return false
}

function addWeek(gamesPerWeek) {
    console.log('adding week')
    store.dispatch(actions.addWeek(gamesPerWeek))
}

function deleteWeek() {
    console.log('deleting week')
    store.dispatch(actions.deleteWeek())
}

function addGame(game) {
    console.log('adding game')
    store.dispatch(actions.addGame(game))
}

function deleteGame() {
    console.log('deleting game')
    store.dispatch(actions.deleteGame())
}