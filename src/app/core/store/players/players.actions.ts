import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Player} from '../../models/player.model'
import axios from 'axios'
import {API_URL} from '../../constants/constants'

export const system = {
    setLoader: createAction('Player loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

export const upsert = createAsyncThunk(
    'Player request',
    async (payload: Player) => {
        try {
            const response = await axios.post(API_URL + 'players', {
                ...payload,
            })

            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
)

export const PlayerActions = {system, upsert}
