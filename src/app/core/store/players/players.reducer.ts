import {createEntityAdapter, EntityState, createReducer} from '@reduxjs/toolkit'
import {Player} from '../../models/player.model'
import {PlayerActions} from './players.actions'

export const playerAdapter = createEntityAdapter<Player>()

export interface PlayerState extends EntityState<Player> {
    loading: boolean
}

export const initialState: PlayerState = playerAdapter.getInitialState({
    loading: false,
})

export const playersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(PlayerActions.system.setLoader, (state, action) => {
            state.loading = action.payload.loading
        })
        .addCase(PlayerActions.upsert.fulfilled, (state, action) =>
            playerAdapter.setAll(state, action.payload),
        )
        .addCase(PlayerActions.add, (state, action) =>
            playerAdapter.upsertOne(state, action.payload.player),
        )
})
