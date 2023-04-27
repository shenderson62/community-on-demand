import React from "react";
import { Text, View, Pressable } from "react-native";
import styles from "./CongratsStyles"
import DrawerScreen from "../../components/DrawerScreen/DrawerScreen";
import Icon from 'react-native-vector-icons/FontAwesome5';
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';

const Congrats = ({ navigation }) => {
  const skills = ["Career Awareness", "Innovation", "Workforce Ready", "STEAM Careers", "Leadership"]
  const checkBoxes = skills.map((skill) => {
    const [checked, setChecked] = React.useState(false)
    return (
      <View key={skill} style={styles.checkBoxArea}>
        <Pressable onPress={() => setChecked(!checked)} style={styles.flex}>
          {checked ? <Icon name="check-square" solid size={25} color="#4E5056" /> : <Icon name="square" size={25} color="#4E5056" />}
        </Pressable>
        <Text style={styles.checkText}>{skill}</Text>
        <View style={styles.flex} />
        {/* empty view to get the skills text centered */}
      </View>
  )})

  return (
    <DrawerScreen
      color="#03A313"
      header={
        <View>
            <Text style={styles.mainText}>Great Job!</Text>
            <Text style={styles.subHeader}>You have completed the Community on Demand Skills Assessment</Text>
        </View>
      }
      body={
        <View>
          <Text style={styles.subText}>Select what skills you would like to include in your resume</Text>
          {checkBoxes}
          <CapsuleButton color="#03A313" style={styles.button} onPress={() => navigation.reset({index: 0, routes: [{name: "Dashboard"}, {name: "Report"}]})}>
            <Text style={styles.buttonText}>See Report</Text>
          </CapsuleButton>
        </View>
      }
    />
  );
};

export default Congrats;
