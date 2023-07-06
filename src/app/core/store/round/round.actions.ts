import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../constants/constants'
import {Bet} from '../../models/bet.model'

export const system = {
    setLoader: createAction('Round loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

export const config = createAction('Round config', (bet: Bet) => ({
    payload: {bet},
}))

export const create = createAsyncThunk(
    'Round create',
    async (roundId: string) => {
        try {
            const response = await axios.post(API_URL + `rounds/`, {
                roundId: roundId,
            })

            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
)

export const RoundActions = {system, create, config}
