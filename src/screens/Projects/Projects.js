import React from 'react';
import { View, Text, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from "./ProjectsStyles"
import Project from '../../components/Project/Project';
import DrawerScreen from '../../components/DrawerScreen/DrawerScreen';
import CapsuleButton from '../../components/CapsuleButton/CapsuleButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from '../../components/constants';
import defaultImage from '../../assets/images/project/default-img.png'

export var projects = []
// get projects from db
AsyncStorage.getItem("email")
  .then(value => {
      console.log("getting projects for user: ", value)
        axios.get(Constants.server + '/project', {
            params: {
                userId: value
            }
        }).then(function (response) {
            var tempProjects = []

            response.data.forEach(element => {
              console.log(element.photo)
              var proj = new Project(element.name, element.description, {uri: element.photo == undefined ? defaultImage : element.photo}, element.notes, element.DomainID, element.ProjID)
              tempProjects.push(proj)
            });
            
            projects = tempProjects;
            console.log(projects)
        })
        .catch(function (error) {
            console.error(error);
        });
      
  })
  .catch(err => console.error(err))

export let selectedProjId = -1
export let pressed = -1 //index of the project that is pressed


const Projects = ({navigation}) => {
  // updates the projects when the back arrow is pressed
  console.log(projects)

  
  const isFocused = useIsFocused()
  React.useEffect(() => {
    projects
  }, [isFocused]);

  // if there are no projects, set the pressed index to -1
  React.useEffect(() => {
    if (projects.length == 0) {
      pressed = -1
    }
  }, [projects]);

  return (
    <DrawerScreen color='#FAC336' headerSize={100} header={
      <Text style={styles.mainText}>Projects</Text>
    } body={
      <>
      {projects.map((project, index) => {return (
        <CapsuleButton key={project.name} color="white" style={styles.project} onPress={() => {
          selectedProjId = project.projectId;
          pressed = index;
          navigation.navigate("Project");
          }}>
          <View style={styles.layout}>
            {/* if the project has an image, show that image */}
            {project.photo
            ? <Image style={styles.image} source={project.photo} />
            : null}
            <View style={styles.textLayout}>
              <Text style={styles.headingText}>{project.name}</Text>
              <Text style={styles.subText}>{project.description}</Text>
            </View>
          </View>
        </CapsuleButton>
      )})}
        <CapsuleButton color="#FAC336" style={styles.button} onPress={() => {
          pressed = -1;
          navigation.navigate("Project");
          }}>
          <Text style={styles.buttonText}>New Project</Text>
        </CapsuleButton>
        <View style={styles.whitespace} />
      </>
    }/>
  )
}
export default Projects;