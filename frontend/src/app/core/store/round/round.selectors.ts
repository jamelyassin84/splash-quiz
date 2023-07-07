import {createSelector} from '@reduxjs/toolkit'
import {AppState} from '@/app/app.state'
import {PlayerState, playerAdapter} from '../players/players.reducer'
import {RoundState, roundAdapter} from './round.reducer'

const feature = (state: AppState) => state.player

export const roundSelector = createSelector(feature, (state: PlayerState) => {
    const players = playerAdapter.getSelectors().selectEntities(state)
    return Object.values(players).find((p) => !p?.isCPU)?.round
})

export const currentResultSelector = createSelector(
    (state: AppState) => state.rounds,
    (state: RoundState) => {
        const rounds = roundAdapter.getSelectors().selectEntities(state)
        return Object.values(rounds)[0]
    },
)

export const betSelector = createSelector(
    (state: AppState) => state.rounds,
    (state: RoundState) => state.bet,
)
