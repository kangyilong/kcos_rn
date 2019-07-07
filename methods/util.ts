import AsyncStorage from '@react-native-community/async-storage';
import CITY from '../assets/city';

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

// 将sql语句中@占位符替换成userId
export function replaceStr(str, userId, symbol = '@') {
    if(typeof str === 'string') {
        let list = str.split(symbol);
        list[0] = list[0] + userId;
        return list.join('');
    }
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
                product_id: item.product_id,
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
                product_id: item.product_id,
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

// 将消费明细中的相同p_code的商品合并为一数组
export function mergeConsumotion(data) {
    if(Array.isArray(data)) {
        let arr = [];
        let obj = {};
        let index = 0;
        data.forEach((item) => {
            if(obj[item.p_code]) {
                obj[item.p_code].shopList.push({
                    shop_id: item.shop_id,
                    product_id: item.product_id,
                    shop_name: item.shop_name,
                    shop_pri: item.shop_pri,
                    shop_pic: item.shop_pic,
                    shopValue: item.shopValue
                });
            }else {
                obj[item.p_code] = {
                    p_code: item.p_code,
                    money_run: item.money_run,
                    run_type: item.run_type,
                    run_time: item.run_time,
                    shopList: [{
                        shop_id: item.shop_id,
                        product_id: item.product_id,
                        shop_name: item.shop_name,
                        shop_pri: item.shop_pri,
                        shop_pic: item.shop_pic,
                        shopValue: item.shopValue
                    }]
                };
                arr[index] = obj[item.p_code];
                index ++;
            }
        });
        return arr;
    }else {
        return null;
    }
}

// 将城市数据处理
export function cityDataFn() {
    if(Array.isArray(CITY)) {
        let arr  = [];
        CITY.forEach(item => {
            if(item.sub) {
                let obj = {};
                obj[item.name] = item.sub;
                item.sub.forEach((cItem, index) => {
                    if(cItem.sub) {
                        let xArr = [];
                        cItem.sub.forEach(xItem => {
                            xArr.push(xItem.name);
                        });
                        obj[item.name][index] = {[cItem.name]: xArr};
                    }
                });
                arr.push(obj);
            }
        });
        return arr;
    }else {
        return null;
    }
}