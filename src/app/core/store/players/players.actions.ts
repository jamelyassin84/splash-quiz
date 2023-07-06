import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Player} from '../../models/player.model'
import axios from 'axios'
import {API_URL} from '../../constants/constants'

const system = {
    setLoader: createAction('Player setLoader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

const add = createAction('Player loader', (player: Player) => ({
    payload: {
        player,
    },
}))

const upsert = createAsyncThunk('Player upsert', async (payload: Player) => {
    try {
        const response = await axios.post(API_URL + 'players', {
            ...payload,
        })

        return response.data
    } catch (error) {
        console.warn(error)
    }
})

export const PlayerActions = {system, upsert, add}
