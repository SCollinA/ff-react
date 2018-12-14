import React from 'react'
import FFWeek from './FFWeek'

export default function FFSchedule(props) {
    return (
        <div className="FFSchedule">
            {props.schedule && props.schedule.map(week => <FFWeek week={week}/>)}
        </div>
    )
}