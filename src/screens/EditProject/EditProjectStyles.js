import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainText: {
    textAlign: "center",
    color: "white",
    fontSize: 36,
    fontWeight: "800",
  },

  inline: {
    flexDirection: "row",
    alignItems: "center",
  },

  headingText: {
    color: "#4E5056",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
  },

  plus: {
    color: "#4E5056",
    fontSize: 50,
    fontWeight: "800",
    textAlign: "center",
    paddingTop: 30,
  },

  photoButton: {
    width: 130,
    height: 130,
    flexDirection: "row",
    borderRadius: 25,
  },

  photoEdit: {
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 99999,
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
  },

  pencilIcon: {
    marginTop: 40,
    marginBottom: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },

  editButton: {
    width: 55,
    marginBottom: 30,
    backgroundColor: "#07344B",
    borderRadius: 99999,
    alignItems: "center",
    paddingVertical: 15,
  },

  deleteButton: {
    width: 55,
    marginLeft: 10,
    marginBottom: 30,
    backgroundColor: "#E03131",
    borderRadius: 99999,
    alignItems: "center",
    paddingVertical: 15,
  },

  layout: {
    flexDirection: "row", 
    marginRight: 65
  },

  whitespace: {
    height: 100,
  },
  flex: {
    flex: 1,
  },

  subHeader: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    paddingBottom: '30%'
  },

  subText: {
    textAlign: "center",
    color: "#888888",
    fontSize: 18,
    marginTop: 40,
  },

  checkBoxArea: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },

  checkText: {
    textAlign: "left",
    color: "#4E5056",
    fontSize: 20,
    fontWeight: "600",
    flex: 3,
  },

  button: {
    marginTop: 40,
  },

});
