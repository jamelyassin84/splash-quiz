import {configureStore} from '@reduxjs/toolkit'
import {PlayerState} from './core/store/players/players.reducer'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './core/store/root.reducer'

export interface AppState {
    player: PlayerState
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
