import {createSelector} from '@reduxjs/toolkit'
import {AppState} from '@/app/app.state'
import {PlayerState, playerAdapter} from '../players/players.reducer'

const feature = (state: AppState) => state.player

export const roundSelector = createSelector(feature, (state: PlayerState) => {
    const players = playerAdapter.getSelectors().selectEntities(state)
    return Object.values(players).find((p) => !p?.isCPU)?.round
})
