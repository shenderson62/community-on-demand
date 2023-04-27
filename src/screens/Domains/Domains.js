import React from 'react';
import { Text, View } from 'react-native';
import styles from "./DomainsStyles"
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen'
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';

const Domains = ({navigation}) => {

  return (
    <DrawerScreen color='#07344B' header={
      <Text style={styles.welcomeText}>Achievement Domains</Text>
    } body={
      <View>
        <Text style={styles.instructionText}>Tap on a skill to learn more</Text>
        <CapsuleButton color="#07344B" style={styles.domainButton} onPress={() => navigation.navigate("CareerAwareness")}>
          <Text style={styles.startText}>Career Awareness</Text>
        </CapsuleButton>
        <CapsuleButton color="#07344B" style={styles.domainButton} onPress={() => navigation.navigate("Innovation")}>
          <Text style={styles.startText}>Innovation</Text>
        </CapsuleButton>
        <CapsuleButton color="#07344B" style={styles.domainButton} onPress={() => navigation.navigate("WorkforceReady")}>
          <Text style={styles.startText}>Workforce Ready</Text>
        </CapsuleButton>
        <CapsuleButton color="#07344B" style={styles.domainButton}  onPress={() => navigation.navigate("SteamCareers")}>
          <Text style={styles.startText}>Steam Careers</Text>
        </CapsuleButton>
        <CapsuleButton color="#07344B" style={styles.domainButton} onPress={() => navigation.navigate("Leadership")}>
          <Text style={styles.startText}>Leadership</Text>
        </CapsuleButton>
      </View>
    }/>
  )
}
export default Domains;