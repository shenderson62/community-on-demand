import React, {useState, useEffect } from "react";
import { Pressable, Text, TextInput, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { launchImageLibrary } from "react-native-image-picker";
import styles from "./EditProjectStyles"
import Projects, { projects, pressed, selectedProjId,  } from "../Projects/Projects";
import Project from "../../components/Project/Project";
import DrawerScreen from "../../components/DrawerScreen/DrawerScreen";
import CapsuleButton from "../../components/CapsuleButton/CapsuleButton";
import axios from "axios";
import Constants from '../../components/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';




AsyncStorage.getItem("email")
    .then(async value => {
        await axios.get(Constants.server + '/project', {
            params: {
                userId: value,
            }
    }).then(async function (response) {
        response.data.forEach(element => {
            var domArr = []
            if (element.DomainID != null) {
                if (element.DomainID.includes("Career Awareness")) {
                    domArr.push("Career Awareness")
                }
                if (element.DomainID.includes("Innovation")) {
                    domArr.push("Innovation")
                }
                if (element.DomainID.includes("Workforce Ready")) {
                    domArr.push("Workforce Ready")
                }
                if (element.DomainID.includes("STEAM Careers")) {
                    domArr.push("STEAM Careers")
                }
                if (element.DomainID.includes("Leadership")) {
                    domArr.push("Leadership")
                }
            }
            var proj = new Project(element.name, element.description, {uri: element.photo}, element.notes, domArr, element.ProjID)
            projects.push(proj)
        });
        
    })
    .catch(function (error) {
        console.error(error);
    });
})
.catch(err => console.error(err))





const EditProject = ({navigation}) => {
  // when finish button is clicked, stop editing
  // if "new project" was clicked (pressed == -1), add a new project
  // otherwise, update the project that was edited
  const onFinish = async () => {
    setEditing(false)

    if (pressed == -1) {
        AsyncStorage.getItem("email")
        .then(async value => {
            var param = {
                "name": name,
                "description": description,
                "photo": photo,
                "notes": notes,
                "DomainID": DomainID.toString(),
                "userId": value,
            };

            await axios.post(Constants.server + "/project", param)
            .then(function (response) {
            projects.push(new Project(name, description, photo, notes, DomainID))
            })
            .catch(function (error) {
            console.error(error);
            });
        })
        .catch(err => console.error(err))


        
    } else {
        projects[pressed].setName(name)
        projects[pressed].setDescription(description)
        projects[pressed].setPhoto(photo)
        projects[pressed].setNotes(notes)
        var domArr = []
        if (DomainID.includes("Career Awareness")) {
            domArr.push('Career Awareness')
        }
        if (DomainID.includes("Innovation")) {
            domArr.push('Innovation')
        }
        if (DomainID.includes("Workforce Ready")) {
            domArr.push('Workforce Ready')
        }
        if (DomainID.includes("STEAM Careers")) {
            domArr.push('STEAM Careers')
        }
        if (DomainID.includes("Leadership")) {
            domArr.push('Leadership')
        }
        projects[pressed].setDomains(domArr)
        AsyncStorage.getItem("email")
        .then(async value => {
            var param = {
                "name": name,
                "description": description,
                "photo": photo,
                "notes": notes,
                "userId": value,
                "DomainID": domArr.toString(),
                "projectId": selectedProjId
            };
            await axios.post(Constants.server + "/project", param)
            .then(function (response) {
            console.log("registered project :", response.data);
            })
            .catch(function (error) {
            console.error(error);
            });
        });


       
    }
  }
  
  const [name, setName] = React.useState("Project Name");
  const [DomainID, setDomains] = React.useState([]);

  // set name to the name of the project at pressed (index)
  React.useEffect(() => {
    if (pressed != -1 && projects[pressed] != undefined) {
        setName(projects[pressed].name)
    }
  }, []);
  const nameRef = React.useRef();

  const [description, setDescription] = React.useState("");
  // set description to the description of the project at pressed (index)
  React.useEffect(() => {
    if (pressed != -1 && projects[pressed] != undefined) {
        setDescription(projects[pressed].description)
      }
  }, []);
  const descriptionRef = React.useRef();

  const [photo, setPhoto] = React.useState(null);
  // set photo to the description of the project at pressed (index)
  React.useEffect(() => {
    if (pressed != -1 && projects[pressed] != undefined) {
        setPhoto(projects[pressed].photo)
      }
  }, []);
  // open photo gallery and set photo to the one chosen by the user
  const onPickPhoto = React.useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPhoto);
  }, []);

  const [notes, setNotes] = React.useState("");
  // set notes to the notes of the project at pressed (index)
  React.useEffect(() => {
    if (pressed != -1 && projects[pressed] != undefined) {
        setNotes(projects[pressed].notes)
      }
  }, []);
  const notesRef = React.useRef();

  const [editing, setEditing] = React.useState(true);
  React.useEffect(() => {
    if (pressed == -1 && projects[pressed] != undefined) {
        setEditing(true) //if there are no current projects, user should be taken to an editable project page
    } else {
        setEditing(false)
    }
  }, [projects]);


  React.useEffect(() => {
    if (pressed != -1 && projects[pressed] != undefined) {
        var domArr = []
        if (projects[pressed].domainId.includes("Career Awareness")) {
            domArr.push("Career Awareness")
        }
        if (projects[pressed].domainId.includes("Innovation")) {
            domArr.push("Innovation")
        }
        if (projects[pressed].domainId.includes("Workforce Ready")) {
            domArr.push("Workforce Ready")
        }
        if (projects[pressed].domainId.includes("STEAM Careers")) {
            domArr.push("STEAM Careers")
        }
        if (projects[pressed].domainId.includes("Leadership")) {
            domArr.push("Leadership")
        }
        setDomains(domArr)
      }
  }, []);

  
const skills = ["Career Awareness", "Innovation", "Workforce Ready", "STEAM Careers", "Leadership"]
const domains = {"Career Awareness": false, "Innovation": false, "Workforce Ready": false, "STEAM Careers": false, "Leadership": false}
const [skillItem, setSkill] = useState(domains);


  var checkBoxes = skills.map((skill) => {

    const [checked, setChecked] = React.useState(false)
    useEffect(() => {
        setChecked(false)
    }, [])


    const handleChange = (id) => {
        let skill = id     
            if (skillItem[skill]) {
                var index = DomainID.indexOf(skill);
                if (index !== -1) {
    
                    DomainID.splice(index, 1);
                }
                let value = skillItem[id]
                let negate = !value
                skillItem[id] = negate
                setSkill(skillItem);
                setDomains(DomainID)
            } else if (!skillItem[skill]) {
                let value = skillItem[id]
                let negate = !value
                skillItem[id] = negate
                setSkill(skillItem);
                DomainID.push(skill);
                setDomains(DomainID)
            } 
            return skillItem[id]
      };
        return (
            <View key={skill} style={styles.checkBoxArea}>
                <Pressable onPress={() => {
                    //handleChange(skill)
                    handleChange(skill)
                    setChecked(!checked)
                    }} style={styles.flex}>
                {skillItem[skill]? <Icon name="check-square" solid size={25} color="#4E5056" /> : <Icon name="square" size={25} color="#4E5056" />}
                </Pressable>
                <Text style={styles.checkText}>{skill}</Text>
                <View style={styles.flex} />
                {/* empty view to get the skills text centered */}
            </View>
        )
    })

    var domainText = '\n'
    for (const domain of DomainID) {
        domainText += "- " + domain + "\n"
    }

  return (
    <>
        {editing
        /* if in edit mode, show screen with pressable pen icons */
        ? <DrawerScreen color="#07344B" headerSize={100} header={
            <Text style={styles.mainText}>{name}</Text>
        } body={
            <View>
                {/* when either the name heading or pencil is pressed, text input is focused */}
                <Pressable style={styles.inline} onPress={() => nameRef.current.focus()}>
                    <TextInput value={name} ref={nameRef} multiline onChangeText={value => setName(value)} style={styles.headingText} />
                    <Icon style={[styles.pencilIcon, {marginTop: 45}]} name="pen" size={20} color="#4E5056" />
                </Pressable>
                {/* when either the description heading or pencil is pressed, text input is focused */}
                <Pressable style={styles.inline} onPress={() => descriptionRef.current.focus()}>
                    <Text style={styles.headingText}>Description</Text>
                    <Icon style={styles.pencilIcon} name="pen" size={20} color="#4E5056" />
                </Pressable>
                <TextInput value={description} ref={descriptionRef} multiline onChangeText={value => setDescription(value)} />
                <Text style={styles.headingText}>Photo</Text>
                {/* if photo is not null, show the image, edit, and delete buttons */}
                {photo 
                ? <ImageBackground style={[styles.photoButton, {justifyContent: "space-between"}]} imageStyle={{borderRadius: 25}} source={photo}>
                    {/* edit button */}
                    <TouchableOpacity style={[styles.photoEdit, {marginLeft: 10}]} onPress={onPickPhoto}>
                        <Icon name="pen" size={20} color="#4E5056" />
                    </TouchableOpacity>
                    {/* trash button */}
                    <TouchableOpacity style={[styles.photoEdit, {marginRight: 10}]} onPress={() => setPhoto(null)}>
                        <Icon name="trash" size={20} color="#E03131" />
                    </TouchableOpacity>
                </ImageBackground>
                /* if the photo is null, show the plus icon */
                : <TouchableOpacity onPress={onPickPhoto}>
                    <ImageBackground style={[styles.photoButton, {justifyContent: "center"}]} imageStyle={{borderRadius: 25}} source={{uri: 'https://www.colorhexa.com/d9d9d9.png'}}>
                        <Text style={styles.plus}>+</Text>
                    </ImageBackground>
                </TouchableOpacity>}

                {/* Adding Domains */}
                <Text style={styles.headingText}>Achievement Domains</Text>
                {checkBoxes}

                {/* when either the notes heading or pencil is pressed, text input is focused */}
                <Pressable style={styles.inline} onPress={() => notesRef.current.focus()}>
                    <Text style={styles.headingText}>Notes</Text>
                    <Icon style={styles.pencilIcon} name="pen" size={20} color="#4E5056" />
                </Pressable>
                <TextInput value={notes} ref={notesRef} multiline onChangeText={value => setNotes(value)} />
                <View style={styles.whitespace} />
            </View>
        } button={
            <View style={styles.layout}>
                {/* finish button stops editing */}
                <CapsuleButton color="#07344B" style={{marginBottom: 30}} onPress={onFinish}>
                    <Text style={styles.buttonText}>Finish</Text>
                </CapsuleButton>
                {/* delete button removes project from the array and navigates back to projects screen*/}
                <TouchableOpacity style={styles.deleteButton} onPress={() => {

                    var del = projects.splice(pressed, 1);
                    navigation.navigate("Projects");
                    // need to actually delete here
                    var todel = (del[0].projectId == undefined ? -1 : del[0].projectId)
                    // need to actually delete here
                    AsyncStorage.getItem("email").then(async function (response) {

                        var param = {
                            "projectId": todel
                        };
                        await axios.post(Constants.server + "/projectdel", param)
                        .then(function (response) {
                            console.log(response.data)
                        })
                        .catch(function (error) {
                        console.error(error);
                        });
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
                }}>
                    <Icon name="trash" size={25} color="white" />
                </TouchableOpacity>
            </View>
        }/>
        /* if not in edit mode, show screen with no text inputs */
        : <DrawerScreen color="#07344B" headerSize={100} header={
            <Text style={styles.mainText}>{name}</Text>
        } body={
            <View>
                <Text style={styles.headingText}>Description</Text>
                <Text>{description}</Text>
                <Text style={styles.headingText}>Photo</Text>
                {photo
                ? <Image style={styles.photoButton} source={photo} />
                : null}
                <Text style={styles.headingText}>Achievement Domains</Text>
                <Text>{domainText}</Text>
                <Text style={styles.headingText}>Notes</Text>
                <Text>{notes}</Text>
            </View>
        } button={
            <View style={{alignItems: "flex-end"}}>
                <TouchableOpacity style={styles.editButton} onPress={() => {
                    setEditing(true)
                    setDomains([])
                    setSkill(domains)
                    checkBoxes = undefined
                }}>
                    <Icon name="pen" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        }/>
        }
    </>
  );
};
export default EditProject;