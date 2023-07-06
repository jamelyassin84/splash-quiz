import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../constants/constants'
import {Message} from '../../models/message.model'

const system = {
    setLoader: createAction('Message loader', (loading: boolean) => ({
        payload: {
            loading,
        },
    })),
}

const upsert = createAction('Message upsert', (message: Message) => ({
    payload: {
        message,
    },
}))

const add = createAsyncThunk(
    'Message add',
    async (message: {playerId: string; roundId: string; content: string}) => {
        try {
            await axios.post(API_URL + `messages/`, message)
        } catch (error) {
            console.warn(error)
        }
    },
)
const load = createAsyncThunk('Message request', async (roundId: string) => {
    try {
        const response = await axios.get(API_URL + `messages/${roundId}`)

        return response.data
    } catch (error) {
        console.warn(error)
    }
})

const clear = createAction('Message clear')

export const MessageActions = {system, load, upsert, add, clear}
