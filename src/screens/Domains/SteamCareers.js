import React, {Fragment, useState, useEffect} from 'react';
import { Image, Text, View } from 'react-native';
import styles from "./DomainsStyles"
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen'
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../../components/constants';
import { projects, pressed, selectedProjId,  } from "../Projects/Projects";

const SteamCareers = ({navigation}) => {

  const [projList, setProjList] = useState('');
  const [progress, setProgress] = useState([]);
  const [skillList, setSkillList] = useState('');
  useEffect(() => {
    AsyncStorage.getItem("email")
      .then(value => {
        // Get game results and timestamps
        axios.get(Constants.server + "/game").then((response) => {
          const games = response.data.filter(entry => entry.Email == value);
          const results = games.map(entry => JSON.parse(entry.Results));
          // Get card => domain data
          axios.get(Constants.server + "/cards").then((response) => {
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
                if (value && domain === 4) {
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
  .catch(err => console.error(err))
  }, []);

  function progressOverTime(progress) {
    var progressPerDomain = {"1": [], "2": [], "3": [], "4": [], "5": []};
    for (entry of progress) {
      for (const [domainID, value] of Object.entries(entry)) {
        progressPerDomain[domainID].push(value);
      }
    }
    return progressPerDomain;
  }


  var projectString = ''
  for (const proj of projects) {
    if (proj.domainId.includes("STEAM Careers")) {
      projectString = projectString + '\n' + proj.name + ": " + "\n-" + proj.description + "\n\n"
    }
  }


  return (
    <DrawerScreen color='#07344B' header={
      <Fragment>
        <Text style={styles.welcomeText}>Steam Careers</Text>
        <Progress.Bar progress={progress[0] === undefined ? 0 : progress[progress.length - 1]["4"]} color='white' unfilledColor='#FAC33655' height={15} width={null} borderWidth={0} style={styles.progress}></Progress.Bar>
        <View style = {styles.progressHeader}>
          <Text style={styles.headerText}>{progress[0] === undefined ? 0 : progress[progress.length - 1]["4"] * 100}% competency of this skill</Text>
       </View>
       </Fragment>
    } image={
      <Image style={styles.image} source={require('../../assets/images/domain-icons/steam-careers.png')}></Image>
    } body={
      <View>
        <Text style={styles.skillsText}>Mastered Skills:</Text>
        <Text style={styles.listSkills}>{skillList == '' ? "N/A" : skillList}</Text>
        <Text style={styles.skillsText}>Related Projects:</Text>
        <Text style={styles.listSkills}>{projectString == '' ? "N/A" : projectString}</Text>
      </View>
    }/>
  )
}
export default SteamCareers;