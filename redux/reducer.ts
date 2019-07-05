import { ACTION_TINT_COLOR, ACTION_USER_ID } from './actionType';
import { combineReducers } from 'redux';

function changeTintColor(state = {}, action) {
    switch(action.type) {
        case ACTION_TINT_COLOR: return action.color;
        default: return '#4BC1D2';
    }
}

function saveUserId(state = {}, action) {
    switch (action.type) {
        case ACTION_USER_ID: return action.userId;
        default: return '';
    }
}

export default combineReducers({
    changeTintColor,
    saveUserId
})
