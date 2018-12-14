import React from 'react'

export default function FFScheduleForm(props) {
    return (
        <form className="FFScheduleForm" 
        onSubmit={event => {
            event.preventDefault()
            let playoffTeams = event.numPlayoffTeams.value
            let playOffWeeks = 0
            while (playoffTeams > 0) {
                playoffTeams /= 2
                playOffWeeks++
            }
            props.makeSchedule(playOffWeeks)
        }}
        >
            <input type="number" name="numTeams" max='16' min='8' step='2' required='true' value='12'/>
            <input type="number" name="numDivs" max='4' min='2' step='1' required='true' value='2'/>
            <input type="number" name="numPlayoffTeams" max='16' min='2' step='1' required='true' value='4'/>
            <input type='reset' value="reset"/>
            <input type="submit" value="submit"/>
        </form>
    )
}