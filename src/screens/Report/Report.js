import {React, useState, useEffect} from 'react';
import { Text, View, Dimensions } from 'react-native';
import styles from "./ReportStyles"
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../../components/constants';
import {LineChart} from "react-native-chart-kit";

const Report = ({navigation}) => {

  const [progress, setProgress] = useState([]);
  const [times, setTimes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("email")
      .then(value => {
        // Get game results and timestamps
        axios.get(Constants.server + "/game").then((response) => {
          const games = response.data.filter(entry => entry.Email == value);
          const results = games.map(entry => JSON.parse(entry.Results));
          const times = games.map(entry => new Date(entry.TimePlayed.toString()));
          // Get card => domain data
          axios.get(Constants.server + "/cards").then((response) => {
            var max = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
            const cards = new Map(response.data.map(entry => {
              max[entry.DomainID]++;
              return [entry.CardID.toString(), entry.DomainID];
            }));
            // Convert to percents in each domain
            var percents = [];
            for (result of results) {
              var percent = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0};
              for (const [cardID, value] of Object.entries(result)) {
                const domain = cards.get(cardID);
                percent[domain] += (value ? 1 : 0) / max[domain];
              }
              percents.push(percent);
            }
            // Save
            setProgress(percents);
            setTimes(times);
          }).catch(err => console.error(err));
        }).catch(err => console.error(err));
      })
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

  const chartWidth = Dimensions.get("window").width * 0.9 - 10;

  var body;
  if (times.length > 0 && progress.length > 0) {
    body = (
      <View>
        <Text style={styles.instructionText}>most recent game{'\n'}{times[times.length - 1].toString().split(" GMT")[0]}</Text>
        
        <Text style={styles.domainText}>Career Awareness: {progress[progress.length - 1]["1"] * 100}%</Text>
        <Progress.Bar progress={progress[progress.length - 1]["1"]} color="#FAC336" unfilledColor='#FAC33655' height={30} width={null} borderWidth={0} style={styles.progress}/>
        <Text style={styles.domainText}>Leadership: {progress[progress.length - 1]["3"] * 100}%</Text>
        <Progress.Bar progress={progress[progress.length - 1]["3"]} color="#FAC336" unfilledColor='#FAC33655' height={30} width={null} borderWidth={0} style={styles.progress}/>
        <Text style={styles.domainText}>Innovation: {progress[progress.length - 1]["2"] * 100}%</Text>
        <Progress.Bar progress={progress[progress.length - 1]["2"]} color="#FAC336" unfilledColor='#FAC33655' height={30} width={null} borderWidth={0} style={styles.progress}/>
        <Text style={styles.domainText}>STEAM Careers: {progress[progress.length - 1]["4"] * 100}%</Text>
        <Progress.Bar progress={progress[progress.length - 1]["4"]} color="#FAC336" unfilledColor='#FAC33655' height={30} width={null} borderWidth={0} style={styles.progress}/>
        <Text style={styles.domainText}>Workforce Ready: {progress[progress.length - 1]["5"] * 100}%</Text>
        <Progress.Bar progress={progress[progress.length - 1]["5"]} color="#FAC336" unfilledColor='#FAC33655' height={30} width={null} borderWidth={0} style={styles.progress}/>

        <Text style={styles.instructionText}>history</Text>

        <LineChart
          data={{
            labels: times.map(entry => entry.getMonth() + 1 + "/" + entry.getDate()),
            datasets: Object.entries(progressOverTime(progress)).map(entry => {
              return {
                data: entry[1],
                color: () => `rgba(${entry[0] * 50}, 160, 0, 255)`
              }
            })
          }}
          segments={5}
          width={times.length == 1 ? chartWidth : chartWidth + chartWidth / (times.length - 1)}
          height={220}
          chartConfig={{
            backgroundGradientFromOpacity: "0",
            backgroundGradientToOpacity: "0",
            fillShadowGradientFromOpacity: "0",
            fillShadowGradientToOpacity: "0",
            decimalPlaces: 1, // optional, defaults to 2dp
            strokeWidth: "2",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "0",
            }
          }}
          style={{
            marginVertical: 20,
            paddingRight: 30,
          }}
        />
        <Text style={{color: "rgba(50, 160, 0, 255)"}}>Career Awareness</Text>
        <Text style={{color: "rgba(100, 160, 0, 255)"}}>Leadership</Text>
        <Text style={{color: "rgba(150, 160, 0, 255)"}}>Innovation</Text>
        <Text style={{color: "rgba(200, 160, 0, 255)"}}>STEAM Careers</Text>
        <Text style={{color: "rgba(250, 160, 0, 255)"}}>Workforce Ready</Text>
      </View>
    )
  } else {
    body = (<Text style={{textAlign: "center", padding: 30}}>No Games Played</Text>)
  }

  return (
    <DrawerScreen color="#FAC336" header={
      <Text style={styles.welcomeText}>Capability Report</Text>
    } body={body}/>
  )
}
export default Report;