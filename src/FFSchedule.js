import React from 'react'
import FFWeek from './FFWeek'

export default function FFSchedule(props) {
    return (
        <div className="FFSchedule">
            {props.weeks && props.weeks.map((week, index) => <FFWeek key={index} weekNumber={index + 1} week={week}/>)}
        </div>
    )
}