import store, * as actions from './store'

export default async function ffScheduleMaker({numTeams, numDivs, numPlayoffTeams}) {
    console.log('in the schedule maker')
    // get a copy of the schedule
    const {schedule} = store.getState()
    // remove old weeks
    deleteWeeks(schedule)
    // find num weeks in schedule
    const numWeeks = 16 - playoffWeeks(numPlayoffTeams)
    // make array of generic team names
    const teams = addTeams(numTeams)
    // make random divisions
    const divisions = addDivisions(numDivs, teams)
    const league = {teams, divisions, numWeeks}
    console.log(league)
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
function addTeams(numTeams) {
    console.log('making new teams')
    const teams = []
    while (numTeams > 0) {
        teams.unshift(`Team ${numTeams}`)
        numTeams--
    }
    return teams
}

// make random divisions
function addDivisions(numDivs, originalTeams) {
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
async function addNextGame(league) {
    let {schedule} = store.getState()
    const {teams, numWeeks} = league
    // go through each week
    for (let i = 0; i < numWeeks; i++) {
        if (i === 15) {
            break
        }
        console.log(`inside week ${i}`)
        if (!schedule[i]) {
            addWeek()
            schedule = store.getState().schedule
        }
        let week = schedule[i] 
        // keep track of checked games by the week
        const checkedGames = []
        // while the week isn't full of games
        while (week && week.length < teams.length / 2) {
            // pick and add random game
            // check it
            checkedGames.push(addRandomGame({...league, checkedGames}))
            // and check path
            // if checkPath returns good schedule 
            if (checkPath(league)) {
                break
            } 
            // update schedule and week
            schedule = store.getState().schedule
            week = schedule[i]
        }
    }
    // get updated schedule
    schedule = store.getState().schedule
    return schedule
}

function addRandomGame(league) {
    // pick a random game
    const randomGame = pickRandomGame(league)
    if (randomGame) {
        console.log(`trying game ${randomGame}`)
        // add it
        addGame(randomGame)
        return randomGame
    } else {
        return []
    }
}

function pickRandomGame(league) {
    console.log('picking random game')
    let {teams, checkedGames} = league
    const allGames = findAllGames(teams)
    const scheduledGames = findScheduledGames()
    const availableGames = []
    // for each possible game
    allGames.forEach(game => {
        // if it is NOT already scheduled
        if (!gameIsScheduled(game, scheduledGames) && !gameIsScheduled(game, checkedGames) && !teamsPlayingAlready(game)) {
            // add it to unscheduled games
            availableGames.push(game)
        }
    })
    // pick one of the available games randomly
    if (availableGames.length > 1) {
        return availableGames[Math.floor(Math.random() * availableGames.length)]
    } else {
        // if no games are available
        return false
    }
}

function findAllGames(teams) {
    console.log('finding all games')
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

function findScheduledGames() {
    console.log('finding scheduled games')
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

function teamsPlayingAlready(game) {
    // console.log('checking if teams are already playing')
    const playingTeams = findPlayingTeams()
    if (playingTeams.includes(game[0]) || playingTeams.includes(game[1])) {
        return true
    }
    return false
}

function findPlayingTeams() {
    // console.log('finding teams playing this week')
    const {schedule} = store.getState()
    const lastWeek = schedule[schedule.length - 1]
    const teamsArray = []
    // for each game in the last week
    for (let i = 0; i < lastWeek.length; i++) {
        const game = lastWeek[i]
        if (!teamsArray.includes(game[0])) {
            teamsArray.push(game[0])
        } 
        if (!teamsArray.includes(game[1])) {
            teamsArray.push(game[1])
        }
    }
    return teamsArray
}


function gameIsScheduled(game, scheduledGames) {
    // console.log('checking if game is scheduled')
    for (let i = 0; i < scheduledGames.length; i++) {
        if (game[0] === scheduledGames[i][0] && game[1] === scheduledGames[i][1]) {
            return true
        }
    }
    return false
}

function checkPath(league) {
    console.log('checking path')
    // check schedule
    if (scheduleIsGood(league)) {
        console.log('good game')
        // keep going
        // return 
        return addNextGame(league)
    } else {
        console.log('bad game')
        // remove game
        deleteGame()
        const {schedule} = store.getState()
        const lastWeek = schedule[schedule.length - 1]
        if (lastWeek.length === 0) {
            deleteWeek()
        }
        // report bad path
        return false
    }
}

function scheduleIsGood(league) {
    console.log('checking schedule')
    // if teams do NOT have less than max home/away games
    if (!homeAwayCompliant(league)) {
        console.log('not home/away compliant')
        return false
    // if teams do NOT have less than max non-div games
    } else if (!nonDivCompliant(league)) {
        console.log('not non div compliant')
        return false
    }
    return true
}

function homeAwayCompliant({teams, numWeeks}) {
    console.log('checking home/away compliance')
    const {schedule} = store.getState()
    // max is length of schedule / 2 rounded up
    const maxHomeAwayGames = Math.ceil(numWeeks / 2)
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
                const game = week[k]
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

function nonDivCompliant({teams, divisions, numWeeks}) {
    console.log('checking non div compliance')
    const {schedule} = store.getState()
    const teamsPerDiv = divisions[0].length
    const maxNonDivGames = numWeeks - ((teamsPerDiv - 1) * 2)
    // for each team
    for (let i = 0; i < teams.length; i++) {
        // for each week
        for (let j = 0; j < schedule.length; j++) {
            // counter for team's non div games
            let nonDivGames = 0
            const week = schedule[j]
            // for each game
            for (let k = 0; k < week.length; k++) {
                const game = week[k]
                // if game is NOT divisional
                if ((game[0] === teams[i] || game[1] === teams[i]) && !gameIsDivisional(game, divisions)) {
                    // increment nonDivGame count
                    nonDivGames++
                }
                // if nonDivGame count greater than maxNonDivGames
                if (nonDivGames > maxNonDivGames) {
                    console.log(`not non div with ${nonDivGames} non div > ${maxNonDivGames} maxNonDivGames`)
                    return false
                }
            }
        }
    }
    return true
}

function gameIsDivisional(game, divisions) {
    console.log('checking if game is divisional')
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