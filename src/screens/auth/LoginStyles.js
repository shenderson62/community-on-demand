import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAC336",
  },

  topContent: {
    marginTop: '15%',
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  codLogo: {
    width: '80%',
    height: undefined,
    aspectRatio: 2.5/1,
  },

  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    width: '80%',
    left: '10%',
    marginBottom: '20%',
  },

  googleButtonText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#777",
  },

  googleIcon: {
    height: 24,
    width: 24,
  },
});
