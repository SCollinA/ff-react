import React from 'react'
import FFTeam from './FFTeam'

export default function FFGame(props) {
    return (
        <div className="FFGame">
            <FFTeam team={props.game.homeTeam}/>
            <h6>vs</h6>
            <FFTeam team={props.game.awayTeam}/>
        </div>
    )
}