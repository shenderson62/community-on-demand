import { StyleSheet } from "react-native";

export default StyleSheet.create({
  welcomeText: {
    textAlign: "center",
    color: "white",
    fontSize: 36,
    fontWeight: "800",
  },

  image: {
    width: "100%",
    height: "100%"
  },

  startButton: {
    marginTop: 40,
  },

  otherButton: {
    borderRadius: 0,
    justifyContent: "flex-start",
    paddingLeft: 25
  },

  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 70
  },

  dividerLine: {
    height: "100%",
    width: "100%",
    backgroundColor: "#DDD",
  },

  buttonText: {
    fontSize: 24,
    left: 50,
    color: '#555'
  },

  buttonIcon: {
    position: "absolute",
    left: 20,
    height: 40,
    width: undefined,
    aspectRatio: 1
  },

  subheader: {
    marginTop: 30,
    marginBottom: -20,
    fontSize: 20,
    color: '#999',
    fontWeight: "bold"
  },

  section: {
    marginTop: 30,
    borderRadius: 20,
    overflow: "hidden"
  },

  startText: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
  }
});
