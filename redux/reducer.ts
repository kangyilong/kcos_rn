import { ACTION_TINT_COLOR } from './actionType';
import { combineReducers } from 'redux';

function changeTintColor(state = {}, action) {
    switch(action.type) {
        case ACTION_TINT_COLOR: return action.color;
        default: return '#4BC1D2';
    }
}

export default combineReducers({
    changeTintColor
})
