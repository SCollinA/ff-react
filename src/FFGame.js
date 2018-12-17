import React from 'react'
import FFTeam from './FFTeam'

export default function FFGame(props) {
    return (
        <div className="FFGame">
            <FFTeam team={props.game.homeTeam}/>
            <h1>vs</h1>
            <FFTeam team={props.game.awayTeam}/>
        </div>
    )
}