import React, { useState, useCallback, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

interface Props {
    swiperHeight: number,
    autoplayTimeout: number,
    swiperData: Array<any>,
    isButtons: boolean,
    isDot: boolean
}
export default function SwiperComponent(props: Props) {
  const renderBanner = useCallback(() => {
      return (
          <View
              style={{height: props.swiperHeight}}
          >
              <Swiper
                  showsButtons={props.isButtons}
                  autoplay
                  autoplayTimeout={props.autoplayTimeout}
                  removeClippedSubviews={false}
                  activeDot={props.isDot && <View style={{    //选中的圆点样式
                      backgroundColor: '#007aff',
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      marginLeft: 10,
                      marginRight: 9,
                      marginTop: 9,
                      marginBottom: 0,
                  }}/>}
              >
                  {
                      Array.isArray(props.swiperData) && props.swiperData.map((item, index) => (
                          <View key={index}>
                              <Image
                                  style={styles.slide}
                                  height={props.swiperHeight}
                                  source={{uri: item.sourceUrl}}
                              />
                          </View>
                      ))
                  }
              </Swiper>
          </View>
      );
  }, []);
  return (
    <View>
      {renderBanner()}
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        width: width
    },
    slide: {
        width: width
    },
    paginationStyle: {
        bottom: 6,
    }
});