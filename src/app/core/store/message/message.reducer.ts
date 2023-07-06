import {createEntityAdapter, EntityState, createReducer} from '@reduxjs/toolkit'
import {Message} from 'yup'
import {MessageActions} from './message.actions'

export const messageAdapter = createEntityAdapter<Message>()

export interface MessageState extends EntityState<Message> {
    loading: boolean
}

export const initialState: MessageState = messageAdapter.getInitialState({
    loading: false,
})

export const messageReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(MessageActions.system.setLoader, (state, action) => {
            state.loading = action.payload.loading
        })
        .addCase(MessageActions.load.fulfilled, (state, action) =>
            messageAdapter.setAll(state, action.payload),
        )
        .addCase(MessageActions.upsert, (state, action) =>
            messageAdapter.upsertOne(state, action.payload.message as any),
        )
})
