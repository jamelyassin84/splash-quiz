import {combineReducers} from 'redux'
import {playersReducer} from './players/players.reducer'

const rootReducer = combineReducers({
    player: playersReducer,
})

export default rootReducer
