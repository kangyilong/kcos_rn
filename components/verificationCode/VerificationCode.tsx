import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

const {width, height} = Dimensions.get('window');

export default class VerificationCode extends React.PureComponent {
    state = {
        hideWebView: false
    };
    postMessage = (event) => {
        switch(event.nativeEvent.data) {
            case 'success': return;
            case 'error': return;
            case 'close':
                this.setState({
                    hideWebView: true
                });
                return;
        }
    };
    render() {
        if(this.state.hideWebView) {
            return null;
        }
        return (
            <View style={styles.webView}>
                <WebView
                    onMessage={this.postMessage}
                    originWhitelist={["*"]}
                    mixedContentMode='always'
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    source={{
                        html: `
                            <html>
                                <head>
                                    <meta charset="utf-8"/>
                                    <meta name="viewport"
                                          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0">
                                    <!-- 国内使用 -->
                                    <script type="text/javascript" charset="utf-8" src="https://g.alicdn.com/sd/nch5/index.js?t=2015052012"></script>
                                    <!-- 若您的主要用户来源于海外，请替换使用下面的js资源 -->
                                    <!-- <script type="text/javascript" charset="utf-8" src="//aeis.alicdn.com/sd/nch5/index.js?t=2015052012"></script> -->
                                    <style type="text/css">
                                        html, body {
                                            height: 100%;
                                            overflow: hidden;
                                            padding: 0;
                                            margin: 0;
                                        }
                                        ._nc .stage1 .slider {
                                            height: 52px !important;
                                            border-radius: 0px !important;
                                            box-shadow: 0 0 3px #999 !important;
                                            background-color: #ddd !important;
                                            left: 0 !important;
                                            right: 0 !important;
                                        }

                                        ._nc .stage1 .track div {
                                            border-radius: 0 !important;
                                        }

                                        ._nc .stage1 .bg-green {
                                            background-color: #78c430 !important;
                                        }

                                        ._nc .stage1 .bg-red {
                                            background-color: #78c430 !important;
                                        }

                                        #__nc {
                                            width: 100%;
                                            height: 100%;
                                            background-color: rgba(0, 0, 0, .4);
                                            position: relative;
                                        }

                                        #toast {
                                            position: absolute;
                                            left: 50%;
                                            top: 40%;
                                            -webkit-transform: translate(-50%, -50%);
                                            -moz-transform: translate(-50%, -50%);
                                            -ms-transform: translate(-50%, -50%);
                                            -o-transform: translate(-50%, -50%);
                                            transform: translate(-50%, -50%);
                                            width: 80%;
                                            padding-top: 26px;
                                            padding-bottom: 40px;
                                            background-color: #fff;
                                            border-radius: 8px;
                                            text-align: center;
                                            background-color: rgba(255,255,255, 0.9);
                                        }
                                        .h5{
                                            margin-bottom: 40px;
                                            font-size: 20px;
                                            font-weight: 400;
                                            color: #222;
                                        }
                                        #nc{
                                            width: 80%;
                                            margin: 0 auto;
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div id="__nc">
                                        <div id="toast">
                                            <p class="h5">滑动获取验证码</p>
                                            <div id="nc"></div>
                                        </div>
                                    </div>

                                    <script>
                                        var nc_token = ["FFFF0N0000000000804E", (new Date()).getTime(), Math.random()].join(':');
                                        var nc = NoCaptcha.init({
                                            renderTo: '#nc',
                                            appkey: "FFFF0N0000000000804E",
                                            scene: "nc_message_h5",
                                            token: nc_token,
                                            trans: {"key1": "code200"},
                                            elementID: ["usernameID"],
                                            is_Opt: 0,
                                            language: "cn",
                                            timeout: 10000,
                                            retryTimes: 5,
                                            errorTimes: 5,
                                            inline: false,
                                            apimap: {},
                                            bannerHidden: false,
                                            initHidden: false,
                                            callback: function (data) {
                                                data.scene = 'nc_message_h5';
                                                data.ncToken = nc_token;
                                                window.ReactNativeWebView.postMessage('success');
                                            },
                                            error: function (err) {
                                                window.ReactNativeWebView.postMessage('error');
                                            }
                                        });
                                        NoCaptcha.setEnabled(true);
                                        nc.reset();//请务必确保这里调用一次reset()方法

                                        NoCaptcha.upLang('cn', {
                                            'LOADING': "加载中...",//加载
                                            'SLIDER_LABEL': "请向右滑动验证",//等待滑动
                                            'CHECK_Y': "验证通过",//通过
                                            'ERROR_TITLE': "非常抱歉，这出错了...",//拦截
                                            'CHECK_N': "验证未通过", //准备唤醒二次验证
                                            'OVERLAY_INFORM': "经检测你当前操作环境存在风险，请输入验证码",//二次验证
                                            'TIPS_TITLE': "验证码错误，请重新输入"//验证码输错时的提示
                                        });
                                        var __nc = document.getElementById('__nc');
                                        var toast = document.getElementById('toast');
                                        setTimeout(() => {window.postMessage(JSON.stringify(__nc));}, 1000);
                                        __nc.onclick = function() {
                                            window.ReactNativeWebView.postMessage('close');
                                        };
                                        toast.onclick = function(e) {
                                            e.stopPropagation();
                                        };
                                    </script>
                                </body>
                                </html>`
                    }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    webView: {
        position: 'absolute',
        left: 0,
        top: 0,
        width,
        height
    }
});