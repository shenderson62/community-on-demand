import React, {useState, useEffect} from 'react';
import { Image, Text, View, Linking } from 'react-native';
import styles from "./DashboardStyles";
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';

const Dashboard = ({navigation}) => {

  const [user, setUser] = useState();
  const [image, setImage] = useState();

  useEffect(() => {

    AsyncStorage.getItem("image")
      .then(value => setImage(value))
      .catch(err => console.error(err))

    AsyncStorage.getItem("name")
      .then(value => setUser(value))
      .catch(err => console.error(err))

  }, []);

  return (
    <DrawerScreen color='#FAC336' header={
      <Text style={styles.welcomeText}>Welcome{"\n"}{user}!</Text>
    } image={
      <Image style={styles.image} source={{uri:image}}></Image>
    } body={
      <View>
        <CapsuleButton color="#FAC336" style={styles.startButton} onPress={() => navigation.navigate("Game")}>
          <Text style={styles.startText}>New Game</Text>
        </CapsuleButton>
        <Text style={styles.subheader}>About Me</Text>
        <View style={styles.section}>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => navigation.navigate("Projects")}>
            <Image style={styles.buttonIcon} source={require("./icons/Projects.png")} />
            <Text style={styles.buttonText}>Projects</Text>
          </CapsuleButton>
          <View style={styles.divider}><View style={styles.dividerLine}/></View>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => navigation.navigate("Resume")}>
            <Image style={styles.buttonIcon} source={require("./icons/Resume.png")} />
            <Text style={styles.buttonText}>Resume</Text>
          </CapsuleButton>
          <View style={styles.divider}><View style={styles.dividerLine}/></View>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => navigation.navigate("Report")}>
            <Image style={styles.buttonIcon} source={require("./icons/CapabilityReport.png")} />
            <Text style={styles.buttonText}>Capability Report</Text>
          </CapsuleButton>
          <View style={styles.divider}><View style={styles.dividerLine}/></View>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => navigation.navigate("Domains")}>
            <Image style={styles.buttonIcon} source={require("./icons/AchievementDomains.png")} />
            <Text style={styles.buttonText}>Achievement Domains</Text>
          </CapsuleButton>
        </View>
        <Text style={styles.subheader}>Links</Text>
        <View style={styles.section}>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => Linking.openURL("https://nextstepsyep.org/events-4/")}>
            <Image style={styles.buttonIcon} source={require("./icons/Calendar.png")} />
            <Text style={styles.buttonText}>Calendar</Text>
          </CapsuleButton>
          <View style={styles.divider}><View style={styles.dividerLine}/></View>
          <CapsuleButton color="white" style={styles.otherButton} onPress={() => Linking.openURL("https://cod-upcomingevents.eventbrite.com/")}>
            <Image style={styles.buttonIcon} source={require("./icons/Events.png")} />
            <Text style={styles.buttonText}>Events</Text>
          </CapsuleButton>
        </View>
      </View>
    }/>
  )
}
export default Dashboard;
