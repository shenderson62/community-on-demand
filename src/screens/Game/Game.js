import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, SafeAreaView, Image , TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardsSwipe from 'react-native-cards-swipe';
import * as Progress from 'react-native-progress';
import styles from "./GameStyle";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../components/constants';
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';

export default Game = ({navigation}) => {

  const [cards, setCards] = useState([]);
  const [progress, setProgress] = useState(0.0);
  const [modalVisible, setModalVisible] = useState(true);
  var gameResult = {};
  var cardsData = [];

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#07344B"
      },
      headerTintColor:'white',
      headerShadowVisible: false,
      headerTitle: () => (
        <Text></Text>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Icon name="gear" size={25} color="white"/>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Exit Game",
            "This game will not be saved",
            [
              {text: "Cancel", style: "cancel"},
              {text: "OK", onPress: () => navigation.goBack() }
            ]
          );
        }}>
          <Icon name="angle-left" size={34} color="white"/>
          <Text style={styles.exitButton}>Exit</Text>
        </TouchableOpacity>
      )
    })

    axios.get(Constants.server + "/cards").then((response) => {
      cardsData = response.data;
      setCards((
        <CardsSwipe
          cards={cardsData}
          loop={false}
          cardContainerStyle={styles.cardContainer}
          renderCard={(card) => {
            if (card) {
              return(
                <View style={styles.card}>
                  <Image
                    style={styles.cardImg}
                    source={{uri: card.src}}
                  />
                </View>
              )
            } else {
              return (
                <Text>Failed to get cards</Text>
              )
            }
          }}
          renderYep={() => (
            <View style={styles.like}>
              <Text style={styles.likeLabel}>Have</Text>
            </View>
          )}
          renderNope={() => (
            <View style={styles.nope}>
              <Text style={styles.nopeLabel}>Don't have</Text>
            </View>
          )}
          
          onSwipedLeft = {(index) => {
            onSwipe(index, false);
          }} 
          onSwipedRight = {(index) => {
            onSwipe(index, true);
          }}
        /> 
      ));
    }).catch(() => {
      setCards((<Text>Failed to get cards</Text>));
    });
  },[])

  function onSwipe(index, didSwipeRight) {
    gameResult[cardsData[index].CardID] = didSwipeRight;
    setProgress((index + 1) / cardsData.length);
    if (index === cardsData.length -1){
      navigation.reset({index: 0, routes: [{name: "Dashboard"}, {name: "Congrats"}]})

      AsyncStorage.getItem("email")
        .then(value => {
          const gameSaveData = {
            Email: value,
            Results: JSON.stringify(gameResult)
          }
          axios.post(Constants.server + "/game", gameSaveData)
            .then(response => console.log("Game saved: ", response))
            .catch(error => console.error("Game save error: ", error));
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Swipe right if you have the skill</Text>
            <Text style={styles.modalText}>or swipe left if you don't</Text>
            <CapsuleButton color="#07344B" style={styles.windowButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.windowText}>Ok</Text>
            </CapsuleButton>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Skills Assessment</Text>
      {cards}
      <Progress.Bar progress={progress} style={styles.progressBar} width={null} color={'#FFF'} unfilledColor={'#FFFFFF55'} borderWidth={0}/>
    </SafeAreaView>
  )
}
