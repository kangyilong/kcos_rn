import AsyncStorage from '@react-native-community/async-storage';

export async function isLogin() {
    return await getUserId();
}

export async function getUserId() {
    return await AsyncStorage.getItem('userId');
}

export async function setUserId(userId) {
    await AsyncStorage.setItem('userId', userId);
}

export async function delUserId() {
    await AsyncStorage.removeItem('userId');
}

// 将订单的相同code合并为一个数组
export function mergeAttribute(data) {
    if(!Array.isArray(data)) {
        return;
    }
    let arr = [];
    let obj = {};
    let index = 0;
    data.forEach((item) => {
        if(obj[item.code]) {
            obj[item.code].mergeList.push({
                shopName: item.shopName,
                shopPic: item.shopPic,
                shopPrice: item.shopPrice,
                shop_id: item.shop_id,
                shopVal: item.shopVal
            });
        }else {
            let o = {
                code: item.code,
                o_status: item.o_status,
                orderTime: item.orderTime,
                psTypeName: item.psTypeName,
                zfTypeName: item.zfTypeName,
                shopTotal: item.shopTotal
            };
            let b = {
                shopName: item.shopName,
                shopPic: item.shopPic,
                shopPrice: item.shopPrice,
                shop_id: item.shop_id,
                shopVal: item.shopVal
            };
            obj[item.code] = o;
            obj[item.code].mergeList = [b];
            arr[index] = obj[item.code];
            index ++;
        }
    });
    return arr;
}