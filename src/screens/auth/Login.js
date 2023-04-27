import React, { useEffect } from "react";
import {SafeAreaView, StatusBar, View, Text, Image} from "react-native";
import styles from "./LoginStyles"
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';
import axios from "axios";
import Constants from '../../components/constants';

GoogleSignin.configure({
  webClientId: '167796720489-0lra4bldgi0nngf0atlj0baesfacm99r.apps.googleusercontent.com',
  offlineAccess: true,
});

function Login({ navigation }) {
  
  // Handle user state changes
  async function updateUser(user) {
    try {
      await AsyncStorage.setItem('name', user.displayName);
      await AsyncStorage.setItem('image', user.photoURL);
      await AsyncStorage.setItem('email', user.email);
      var param = {
        "name": user.displayName,
        "photoURL": user.photoURL,
        "email": user.email
      };
      navigation.replace("Dashboard");
      //post the user data
      await axios.post(Constants.server + "/user", param)
        .then(function (response) {
          console.log("registered user: ", response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(updateUser);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function signinWithGoogle() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topContent}>
        <Image style={styles.codLogo} source={require("./CODLogo.png")} />
      </View>

      <View style={styles.bottomContent}>
        <CapsuleButton color="white" onPress={signinWithGoogle}>
          <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
            />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </CapsuleButton>
      </View>
    </SafeAreaView>
  );
}

export default Login;
