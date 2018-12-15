import React from 'react'

export default function FFScheduleForm(props) {
    return (
        <form className="FFScheduleForm" 
        onSubmit={event => {
            event.preventDefault()
            console.log('in the ff schedule form')
            const { numPlayoffTeams, numDivs, numTeams } = event.target
            props.makeSchedule({numTeams: numTeams.value, numDivs: numDivs.value, numPlayoffTeams:  numPlayoffTeams.value})
        }}
        >
            <label name="numTeams"># of teams</label>
            <input type="number" name="numTeams" max='16' min='8' step='2' required={true} defaultValue='12'/>
            <label name="numDivs"># of divs</label>
            <input type="number" name="numDivs" max='4' min='2' step='1' required={true} defaultValue='2'/>
            <label name="numPlayoffTeams"># of playoff teams</label>
            <input type="number" name="numPlayoffTeams" max='16' min='2' step='1' required={true} defaultValue='4'/>
            <input type='reset' value="reset"/>
            <input type="submit" value="submit"/>
        </form>
    )
}