import React from "react";
import { Text, View, Pressable } from "react-native";
import styles from "./SettingsStyles"
import DrawerScreen from "../../components/DrawerScreen/DrawerScreen";
import CapsuleButton from "../../components/CapsuleButton/CapsuleButton";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const Settings = ({ navigation }) => {
  function logOut() {
    auth().signOut().then(() => {
      GoogleSignin.revokeAccess();
      navigation.reset({index: 0, routes: [{name: "Login"}]});
    }); 
  }
  return (
    <DrawerScreen
      color="#FAC336"
      header={
        <Text style={styles.mainText}>Settings</Text>
      }
      body={
        <View>
          <CapsuleButton color="#FAC336" style={styles.button} onPress={logOut}>
            <Text style={styles.buttonText}>Logout</Text>
          </CapsuleButton>
        </View>
      }
    />
  );
};

export default Settings;
