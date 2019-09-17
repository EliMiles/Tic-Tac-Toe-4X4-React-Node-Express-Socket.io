import React from 'react'
import '../../style.css'

export default function index(props) {
    return (
        <button className="square" onClick={props.onClick} disabled={!props.isMyTurn}>
            {props.value}
        </button>
    )
}
