import React from 'react'
import FFGame from './FFGame'

export default function FFWeek(props) {
    return (
        <div className="FFWeek">
            <h1>Week {props.weekNumber}</h1>
            {props.games.map((game, index) => <FFGame key={index} game={game} />)}
        </div>
    )
}