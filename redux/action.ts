import { ACTION_TINT_COLOR, ACTION_USER_ID } from './actionType';

export function actionTintColor(color) {
    return {
        type: ACTION_TINT_COLOR,
        color
    }
}

export function actionUserId(userId) {
    return {
        type: ACTION_USER_ID,
        userId
    }
}