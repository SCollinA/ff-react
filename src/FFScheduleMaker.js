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
    return makeSchedule(league)
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
    console.log('making divisions list')
    // make new divisions list
    let divisions = []
    // add empty divisions
    while (numDivs > 0) {
        divisions.push([])
        numDivs--
    }
    // make a copy of the teams array
    const teams = originalTeams.slice()
    // until all teams are added
    while (teams.length > 0) {
        // get a random team
        const randomTeamIndex = Math.floor(Math.random() * teams.length)
        const randomTeam = teams.splice(randomTeamIndex)
        // get a random division
        const randomDivIndex = Math.floor(Math.random() * divisions.length)
        // add team to division
        divisions[randomDivIndex].push(randomTeam)
    }
    return divisions
}

function makeDivisionsList() {
    
}

// this is the recursive function
function makeSchedule(league) {
    recursionCounter = 0
    console.log(league)
    const {schedule, teams, divisions, numWeeks} = league
    console.log(`beginning recursion level ${++recursionCounter}, at ${league}`)
    while (schedule.length < numWeeks || (schedule.length > 0 && schedule[schedule.length - 1].length < teams.length / 2)) {
        // while it's empty, add random games
        console.log(`whaaaa`)  
        break
    } 
    // return schedule



    addWeek()
    deleteWeek()
    addGame()
    deleteGame()
    return [
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
        [
            ['Team1', 'Team2'],
            ['Team3', 'Team4'],
            ['Team5', 'Team6'],
            ['Team7', 'Team8'],
        ],
    ]
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