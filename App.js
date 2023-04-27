import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import Login from './src/screens/auth/Login';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Game from './src/screens/Game/Game';
import Projects from './src/screens/Projects/Projects';
import Domains from './src/screens/Domains/Domains';
import Resume from './src/screens/Resume/Resume';
import Settings from './src/screens/Settings/Settings';
import Congrats from './src/screens/Congrats/Congrats';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CareerAwareness from './src/screens/Domains/CareerAwareness';
import Leadership from './src/screens/Domains/Leadership';
import WorkforceReady from './src/screens/Domains/WorkforceReady';
import Innovation from './src/screens/Domains/Innovation';
import SteamCareers from './src/screens/Domains/SteamCareers';
import Report from './src/screens/Report/Report';
import EditProject from './src/screens/EditProject/EditProject';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name = "Login" component = {Login} options={{headerShown: false}}/>
        <Stack.Screen name = "Settings" component = {Settings}/>
        <Stack.Screen name = "Dashboard" component = {Dashboard}/>
        <Stack.Screen name = "Resume" component = {Resume}/>
        <Stack.Screen name = "Projects" component = {Projects}/>
        <Stack.Screen name = "Project" component = {EditProject}/>
        <Stack.Screen name = "Congrats" component = {Congrats}/>
        <Stack.Screen name = "Domains" component = {Domains}/>
        <Stack.Screen name = "CareerAwareness" component = {CareerAwareness}/>
        <Stack.Screen name = "Leadership" component = {Leadership}/>
        <Stack.Screen name = "WorkforceReady" component = {WorkforceReady}/>
        <Stack.Screen name = "Innovation" component = {Innovation}/>
        <Stack.Screen name = "SteamCareers" component = {SteamCareers}/>
        <Stack.Screen name = "Report" component = {Report}/>
        <Stack.Screen name = "Game" component = {Game}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
