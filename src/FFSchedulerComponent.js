import React from 'react'
import FFScheduleForm from './FFScheduleForm'
import FFSchedule from './FFSchedule'

export default function FFScheduler(props) {
    return (
        <div className="FFScheduler">
            <h1>{props.title}</h1>
            <FFScheduleForm />
            <FFSchedule />
        </div>
    )
}