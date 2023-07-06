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
        .addCase(PlayerActions.system.setLoader, (state, action) => ({
            ...state,
            error: action.payload.loading,
        }))
        .addCase(PlayerActions.upsert.fulfilled, (state, action) => {
            console.log(action.payload)

            return playerAdapter.setAll(state, action.payload)
        })
})
