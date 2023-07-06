import {combineReducers} from 'redux'
import {playersReducer} from './players/players.reducer'
import {messageReducer} from './message/message.reducer'
import {roundReducer} from './round/round.reducer'

const rootReducer = combineReducers({
    player: playersReducer,
    messages: messageReducer,
    rounds: roundReducer,
})

export default rootReducer
