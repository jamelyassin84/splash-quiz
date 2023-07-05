import {AppState} from '@/app/app.state'
import {PlayerState, playerAdapter} from './players.reducer'
import {createSelector} from '@reduxjs/toolkit'
import {
    toArrayEntity,
    toObjectEntity,
} from '../../helpers/transfor-entity.helper'
import {Player} from '../../models/player.model'

const feature = (state: AppState) => state.player

export const playerIsLoading = createSelector(
    feature,
    (state: PlayerState) => state.loading,
)

export const playerSelector = createSelector(feature, (state: PlayerState) =>
    (toArrayEntity(state.entities as any) as Player[]).find(
        (p) => p.isCPU === false,
    ),
)

export const playersSelector = createSelector(feature, (state: PlayerState) =>
    toArrayEntity(state.entities as any),
)

export const playerBaseSelectors = playerAdapter.getSelectors()
