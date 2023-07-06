import {createEntityAdapter, EntityState, createReducer} from '@reduxjs/toolkit'
import {RoundActions} from './round.actions'
import {Round} from '../../models/round.model'
import {Bet} from '../../models/bet.model'

export const roundAdapter = createEntityAdapter<Round>()

export interface RoundState extends EntityState<Round> {
    loading: boolean
    bet: Bet
}

export const initialState: RoundState = roundAdapter.getInitialState({
    loading: false,
    bet: {
        speed: 5,
        points: 50,
        multiplier: 2.25,
    },
})

export const roundReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(RoundActions.system.setLoader, (state, action) => {
            state.loading = action.payload.loading
        })
        .addCase(RoundActions.config, (state, action) => {
            state.bet = action.payload.bet
        })
        .addCase(RoundActions.create.fulfilled, (state, action) =>
            roundAdapter.setAll(state, [action.payload]),
        )
        .addCase(RoundActions.clear, (state, action) => {
            state.bet = {
                speed: 5,
                points: 50,
                multiplier: 2.25,
            }

            return roundAdapter.removeAll(state)
        })
})
