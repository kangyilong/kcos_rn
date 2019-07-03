import { ACTION_TINT_COLOR } from './actionType';

export function actionTintColor(color) {
    return {
        type: ACTION_TINT_COLOR,
        color
    }
}