import React from 'react'
import HeaderPlayerName from './HeaderPlayerName'
import HeaderTime from './HeaderTime'
import HeaderTotalPoints from './HeaderTotalPoints'

export default function Header() {
    return (
        <div className="grid grid-cols-3 gap-5">
            <HeaderTotalPoints />
            <HeaderPlayerName />
            <HeaderTime />
        </div>
    )
}
