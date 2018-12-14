import React from 'react'
import FFGame from './FFGame'

export default function FFWeek(props) {
    return (
        <div className="FFWeek">
            {props.week.map(game => <FFGame game={game} />)}
        </div>
    )
}