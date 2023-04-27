import { StyleSheet } from "react-native";

export default StyleSheet.create({
  flex: {
    flex: 1,
  },

  mainText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 36,
    fontWeight: "800",
    marginTop: '30%',
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
    textAlign: "center",
    color: "#4E5056",
    fontSize: 20,
    fontWeight: "600",
    flex: 3,
  },

  button: {
    marginTop: 40,
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },
});
