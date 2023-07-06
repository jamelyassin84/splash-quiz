import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../constants/constants'

export const system = {
    setLoader: createAction('Message loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

export const load = createAsyncThunk(
    'Message request',
    async (roundId: string) => {
        try {
            const response = await axios.get(API_URL + `messages/${roundId}`)

            return response.data
        } catch (error) {
            console.warn(error)
        }
    },
)

export const MessageActions = {system, load}
