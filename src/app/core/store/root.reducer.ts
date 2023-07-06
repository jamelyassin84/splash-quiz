import {combineReducers} from 'redux'
import {playersReducer} from './players/players.reducer'
import {messageReducer} from './message/message.reducer'

const rootReducer = combineReducers({
    player: playersReducer,
    messages: messageReducer,
})

export default rootReducer
