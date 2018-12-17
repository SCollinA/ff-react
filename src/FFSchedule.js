import React from 'react'
import FFWeek from './FFWeek'

export default function FFSchedule(props) {
    return (
        <div className="FFSchedule">
            {props.weeks && props.weeks.map((games, index) => <FFWeek key={index} weekNumber={index + 1} games={games}/>)}
        </div>
    )
}