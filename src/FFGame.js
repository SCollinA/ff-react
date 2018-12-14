import React from 'react'
import FFTeam from './FFTeam'

export default function FFGame(props) {
    return (
        <div className="FFGame">
            <FFTeam team={props.game[0]}/>
            <FFTeam team={props.game[1]}/>
        </div>
    )
}