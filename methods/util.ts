import AsyncStorage from '@react-native-community/async-storage';

export async function isLogin() {
    return await getUserId();
}

export async function getUserId() {
    return await AsyncStorage.getItem('userId');
}