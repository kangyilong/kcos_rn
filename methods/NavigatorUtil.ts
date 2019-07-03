/*
* 配置项目中所有的导航方法
* */
export default class NavigatorUtil {
    static navigation: any;
    /*
    * 返回上一页
    * */
    static goBack(navigator) {
        navigator.goBack();
    }
    /*
    * 跳转到指定页面
    * */
    static goPage(page, params = {}) {
        const navigation = NavigatorUtil.navigation;
        if(!navigator) {
            return;
        }
        navigation.navigate(page, params);
    }
}