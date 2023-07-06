import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../constants/constants'
import {Bet} from '../../models/bet.model'
import {Player} from '../../models/player.model'

const system = {
    setLoader: createAction('Round loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

const config = createAction('Round config', (bet: Bet) => ({
    payload: {bet},
}))

const create = createAsyncThunk(
    'Round create',
    async (payload: {
        roundId: string
        playerId: string
        points: number
        multiplier: number
        players: Player[]
    }) => {
        try {
            const response = await axios.post(API_URL + `rounds/`, payload)

            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
)

export const RoundActions = {system, create, config, stop}
