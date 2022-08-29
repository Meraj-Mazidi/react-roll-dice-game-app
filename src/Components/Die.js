import React from 'react'

function Die(props) {
    const FrozenStyles = {
        backgroundColor: "#59E391",
        fontWeight: 'bold'
    }
    const normalStyle = {
        backgroundColor: "#ffffff",
    }
    return (
        <div
            className='box'
            style={props.isHeld ? FrozenStyles : normalStyle}
            onClick={props.holdDice}
        >
            {props.value}
        </div>
    )
}

export default Die
