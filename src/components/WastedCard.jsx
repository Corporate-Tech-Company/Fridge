import React from 'react'
import './fridgeCard.scss'

function WastedCard({food}) {
    return(
        <div className = "fridge-card">
            <div>{food.name}</div>
            <div>{food.quantity}</div>
            <div>{food.price}</div>
            <div>{food.datePurchased}</div>
            <div>{food.useByDate}</div>
        </div>
    )
}

export default WastedCard