'use client'
import React from 'react'
import {Provider} from 'react-redux'
import store from '../app.state'
import {Game} from './game/Game'

export default function Main() {
    return (
        <div className="flex items-center justify-center w-full px-5">
            <Provider store={store}>
                <Game />
            </Provider>
        </div>
    )
}
