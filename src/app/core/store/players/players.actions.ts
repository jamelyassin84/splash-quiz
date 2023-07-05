import {createAction} from '@reduxjs/toolkit'
import {Player} from '../../models/player.model'

export const system = {
    setLoader: createAction('Player loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

export const upsert = {
    request: createAction('Player request', (player: Player) => ({
        payload: {
            player,
        },
    })),
    onSuccess: createAction('Player onSuccess', (player: Player) => ({
        payload: {
            player,
        },
    })),
}

export const PlayerActions = {system, upsert}
