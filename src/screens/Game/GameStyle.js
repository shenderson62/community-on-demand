import { StyleSheet } from "react-native";

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#07344B',
      alignItems: 'center',
      justifyContent: 'center',
    },

    exitButton: {
      color: "white",
      fontSize: 17,
      position: "absolute",
      width: 30,
      left: 22,
      top: 8
    },
  
    title: {
      position: "absolute",
      top: 5,
      textAlign: "center",
      color: "white",
      fontSize: 30,
      fontWeight: "800",
    },
  
    cardContainer: {
      width: '90%',
      height: '82%',
    },
  
    progressBar: {
      position: 'absolute',
      width: "90%",
      top: "95%"
    },
  
    card: {
      // backgroundColor: '#eba134',
      width: '100%',
      height: '100%',
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.07,
      shadowRadius: 3.3,
    },
  
    cardImg: {
      width: '100%',
      height: '100%',
      borderRadius: 13,
    },

    nope: {
      borderWidth: 5,
      borderRadius: 6,
      padding: 8,
      marginRight: 30,
      marginTop: 25,
      borderColor: 'red',
      transform: [{ rotateZ: '22deg' }],
    },
    nopeLabel: {
      fontSize: 32,
      color: 'red',
      fontWeight: 'bold',
    },
    like: {
      borderWidth: 5,
      borderRadius: 6,
      padding: 8,
      marginLeft: 30,
      marginTop: 20,
      borderColor: 'lightgreen',
      transform: [{ rotateZ: '-22deg' }],
    },
    likeLabel: {
      fontSize: 32,
      color: 'lightgreen',
      fontWeight: 'bold',
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },

    windowButton: {
      paddingVertical: 20,
      marginTop: 20,
      marginBottom: -10,
    },

    windowText: {
      color: "white",
      fontSize: 16,
      fontWeight: "800",
      position: "absolute",
    }


  });
