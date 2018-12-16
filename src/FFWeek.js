import React from 'react'
import FFGame from './FFGame'

export default function FFWeek(props) {
    return (
        <div className="FFWeek">
            <h6>Week {props.weekNumber}</h6>
            {props.week.map((game, index) => <FFGame key={index} game={game} />)}
        </div>
    )
}