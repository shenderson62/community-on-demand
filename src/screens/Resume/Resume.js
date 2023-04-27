import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./ResumeStyles"
import axios from 'axios';
import Constants from '../../components/constants';
import { projects, pressed, selectedProjId,  } from "../Projects/Projects";
import Project from "../../components/Project/Project";
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen'




var projDict = []; // create an empty array
const Resume = ({navigation}) => {

  const [progress, setProgress] = useState([]);
  const [skillList, setSkillList] = useState('');
  // const [projList, setProjList] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("email")
      .then(async value => {
        // Get game results and timestamps
        axios.get(Constants.server + "/game").then(async (response) => {
          const games = response.data.filter(entry => entry.Email == value);
          const results = games.map(entry => JSON.parse(entry.Results));
          // Get card => domain data
          await axios.get(Constants.server + "/cards").then((response) => {
            var max = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
            const cards = new Map(response.data.map(entry => {
              max[entry.DomainID]++;
              return [entry.CardID.toString(), entry.DomainID];
            }));
            // Convert to percents in each domain
            var percents = [];
            var skills = []
            for (const result of results) {
              var percent = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};

              for (const [cardID, value] of Object.entries(result)) {
                const domain = cards.get(cardID);
                percent[domain] += (value ? 1 : 0) / max[domain];
              }
              percents.push(percent);
            }

            for (const [cardID, value] of Object.entries(results[results.length - 1])) {
              const domain = cards.get(cardID);
              try {
                if (value) {
                  for (const responses of response.data) {
                    if (responses["CardID"] == cardID && !(skills.includes(responses["CardName"]))) {
                      skills = skills + "-" + responses["CardName"] + "\n"
                    }
                  }
                  
                }
              } catch (e) {
              }
            }
            // Save
            setProgress(percents);
            setSkillList(skills)
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      })
      .catch(err => console.error(err))

  }, []);
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  


  useEffect(() => {
    AsyncStorage.getItem("name")
      .then(value => setUser(value))
      .catch(err => console.error(err))

      AsyncStorage.getItem("email")
      .then(value => setEmail(value))
      .catch(err => console.error(err))
  }, []);

  var projectString = ''
  for (const proj of projects) {
    projectString = projectString + proj.name + ": " + "\n-" + proj.description + "\n\n"
  }
  return (
    <DrawerScreen color='#FAC336' header={
      <Text style={styles.title}>Resume</Text>
    } body={
      <View>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.header}>{email}</Text>
        <Text style={styles.sectionText}>Skills</Text>
        <Text style={styles.bodyText}>{skillList}</Text>
        <Text style={styles.sectionText}>Experience</Text>
        <Text style={styles.bodyText}>{projectString}</Text>
      </View>
    }/>
  )
}
export default Resume;