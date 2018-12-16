import store, * as actions from './store'

let recursionCounter = 0

export default function ffScheduleMaker({numTeams, numDivs, numPlayoffTeams}) {
    console.log('in the schedule maker')
    // get a copy of the schedule
    const {schedule} = store.getState()
    // find weeks in regular season
    const numWeeks = 16 - playoffWeeks(numPlayoffTeams)
    // make array of generic team names
    const teams = makeTeams(numTeams)
    // make random divisions
    const divisions = makeDivisions(numDivs, teams)
    const league = {schedule, teams, divisions, numWeeks}
    return addNextGame(league)
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
    console.log(league)
    let {schedule, teams, divisions, numWeeks} = league
    console.log(`beginning recursion level ${++recursionCounter}`)
    // if the schedule isn't full of weeks
    if (schedule.length <= numWeeks) {
        // if the schedule is empty
        if (schedule.length === 0) {
            // add a week
            addWeek()
            schedule = store.getState().schedule
            addNextGame(league)
        } else {
            // get the last week
            const week = schedule[schedule.length - 1]
            // if the week isn't full of games
            if (week.length < teams.length / 2) {
                // add a random game
                addGame(randomGame(league))
                schedule = store.getState().schedule
                // check schedule 
                if (scheduleIsGood(league)) {
                    // keep going
                    if (!addNextGame(league)) {
                        deleteGame()
                        return false
                    }
                } else {
                    // remove game
                    deleteGame()
                    // report bad path
                    return false
                }
            } else if (schedule.length < numWeeks) {
                // add another week
                addWeek()
                schedule = store.getState().schedule
                addNextGame(league)
            }
        }
    }
    return schedule
}

function randomGame(league) {
    let {schedule, teams, divisions, numWeeks} = league
    const allGames = allGames(teams)
    const scheduledGames = scheduledGames(schedule)
    const unscheduledGames = []
    allGames.forEach(game { 
        if (!scheduledGames.includes(game)) {
            unscheduledGames.push(game)
            allGames.splice(index)
        }
    }
    // make a copy of the teams list
    const teams = originalTeams.slice()
    // get one random team
    let randomIndex = Math.floor(Math.random() * teams.length)
    const randomTeam1 = teams.splice(randomIndex, 1)[0]
    randomIndex = Math.floor(Math.random() * teams.length)
    const randomTeam2 = teams.splice(randomIndex, 1)[0]
    return [randomTeam1, randomTeam2]
}

function allGames(teams) {

}

function scheduleIsGood(league) {
    const {schedule, teams, divisions, numWeeks} = league
    // if (schedule.length === numWeeks && schedule[schedule.length - 1].length === teams.length / 2) {
    //     return schedule
    // } else {
    //     return makeSchedule(league)

    // }
    return true
}

function addWeek() {
    console.log('we made it add week')
    store.dispatch(actions.addWeek())
}

function deleteWeek() {
    console.log('we made it del week')
    store.dispatch(actions.deleteWeek())
}

function addGame(game) {
    console.log('we made it add game')
    store.dispatch(actions.addGame(game))
}

function deleteGame() {
    console.log('we made it del game')
    store.dispatch(actions.deleteGame())
}