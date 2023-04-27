import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainText: {
    textAlign: "center",
    color: "white",
    fontSize: 36,
    fontWeight: "800",
  },

  button: {
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },

  project: {
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "column",
  },

  headingText: {
    color: "#4E5056",
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  
  subText: {
    alignSelf: "flex-start",
    paddingHorizontal: 25,
  },

  layout: {
    flexDirection: "row",
  },

  textLayout: {
    flexDirection: "column", 
    marginLeft: -10, 
    marginRight: 10,
    flex:2
  },

  image: {
    width: 80, 
    height: 80, 
    marginLeft: 10, 
    borderRadius: 15,
    flex: 1
  },

  whitespace: {
    height: 20,
  },
});
