import {createSelector} from '@reduxjs/toolkit'
import {AppState} from '@/app/app.state'
import {MessageState, messageAdapter} from './message.reducer'

const feature = (state: AppState) => state.messages

export const messageIsLoading = createSelector(
    feature,
    (state: MessageState) => state.loading,
)

export const messageSelector = createSelector(
    feature,
    (state: MessageState) => {
        const messages = messageAdapter.getSelectors().selectEntities(state)
        return Object.values(messages)
    },
)

export const playersSelector = createSelector(feature, (state: MessageState) =>
    messageAdapter.getSelectors().selectAll(state),
)

export const playerBaseSelectors = messageAdapter.getSelectors()
