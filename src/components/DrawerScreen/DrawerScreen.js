import React, { useEffect, useState, useCallback } from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const DrawerScreen = (props) => {
  let borderRadius = 40;
  let imageSize = 150;
  let headerPaddingTop = 20;
  let headerPaddingBottom = 50;
  let imageCenter = 0.4;
  let windowHeight = Dimensions.get('window').height;
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: props.color
      },
      headerTintColor:'white',
      headerShadowVisible: false,
      headerTitle: () => (
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', top: Math.max(10 - scrollY * 0.1, 0), opacity: scrollY * 0.008}}>{navigation.getState().routes[navigation.getState().routes.length - 1].name}</Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="gear" size={25} color="white"/>
        </TouchableOpacity>
      )
    })
  })

  const [headerHeight, setHeaderHeight] = useState(null);

  const onLayout = useCallback(event => {
    if (headerHeight == null) {
      let {height} = event.nativeEvent.layout;
      setHeaderHeight(height);
    }
  }, [headerHeight]);

  return (<>
    <StatusBar barStyle="light-content" />
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F2F2'}}>
      <View style={{backgroundColor: props.color, position: 'absolute', width: '100%', height: '100%'}}></View>
      <View style={{marginTop: headerPaddingTop - scrollY * 0.3, opacity: 1 - scrollY * 0.008, width: '80%', left: '10%', transform: [{ scale: 1 - Math.max(scrollY, 0) * 0.002 }]}}>
        <View onLayout={onLayout}>
          {props.header}
        </View>
      </View>
    </SafeAreaView>
    <ScrollView onScroll={(e)=>{setScrollY(e.nativeEvent.contentOffset.y)}} scrollEventThrottle={8} style={{position:'absolute', height: '100%', width: '100%'}}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: '#F2F2F2', borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius, marginTop: headerHeight + headerPaddingTop + headerPaddingBottom + (props.image ? imageSize * imageCenter : 0)}}>
        {props.image ? <View style={{height: imageSize, width: imageSize, backgroundColor: 'white', borderRadius: 99999, overflow: 'hidden', top: -imageSize*imageCenter, marginBottom: -imageSize*imageCenter}}>{props.image}</View> : undefined}
        <View style={{width: '90%', paddingBottom: safeAreaInsets.bottom + 20}}>
          {props.body}
        </View>
        <View style={{backgroundColor: '#F2F2F2', width: '100%', height: windowHeight, marginBottom: -windowHeight}}></View>
      </View>
    </ScrollView>
    <View style={{padding: 30}}>
      {props.button}
    </View>
  </>)
}
export default DrawerScreen;
