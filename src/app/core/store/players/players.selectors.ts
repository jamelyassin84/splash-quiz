import {createSelector} from '@reduxjs/toolkit'
import {AppState} from '@/app/app.state'
import {PlayerState, playerAdapter} from './players.reducer'

const feature = (state: AppState) => state.player

export const playerIsLoading = createSelector(
    feature,
    (state: PlayerState) => state.loading,
)

export const playerSelector = createSelector(feature, (state: PlayerState) => {
    const players = playerAdapter.getSelectors().selectEntities(state)
    return Object.values(players).find((p) => !p?.isCPU)
})

export const playersSelector = createSelector(feature, (state: PlayerState) =>
    playerAdapter.getSelectors().selectAll(state),
)

export const playerBaseSelectors = playerAdapter.getSelectors()
