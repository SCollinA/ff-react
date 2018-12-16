import React from 'react'
import FFScheduleForm from './FFScheduleForm'
import FFSchedule from './FFSchedule'

export default function FFSchedulerComponent(props) {
    return (
        <div className="FFSchedulerComponent">
            <h1>{props.title}</h1>
            <FFScheduleForm makeSchedule={props.makeSchedule} />
            <FFSchedule schedule={props.schedule} />
        </div>
    )
}