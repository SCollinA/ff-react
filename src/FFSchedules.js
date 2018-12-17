import React from 'react'
import FFScheduleForm from './FFScheduleForm'
import FFSchedule from './FFSchedule'

export default function FFSchedules(props) {
    return (
        <div className="FFSchedules">
            <h1>{props.title}</h1>
            <FFScheduleForm makeSchedule={props.makeSchedule}/>
            <FFSchedule schedule={props.weeks} />
        </div>
    )
}