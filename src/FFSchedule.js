import React from 'react'
import FFWeek from './FFWeek'

export default function FFSchedule(props) {
    console.log(props)
    return (
        <div className="FFSchedule">
            {props.schedule.map((week, index) => <FFWeek key={index} weekNumber={index + 1} week={week}/>)}
        </div>
    )
}