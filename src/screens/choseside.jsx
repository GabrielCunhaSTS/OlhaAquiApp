import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

export default function ChooseSide({ navigation }) {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => navigateToScreen("CondominoPage")}
        >
           <Image
              source={require('../img/group.png')}
              style={[styles.icon, { width: 70, height: 70 }]}
            /> 
        </TouchableOpacity>
        <Text style={styles.label}>Condomínio</Text>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => navigateToScreen("CondominioPage")}
        >
          <Image
              source={require('../img/building.png')}
              style={[styles.icon, { width: 70, height: 70 }]}
            />
        </TouchableOpacity>
        <Text style={styles.label}>Condômino</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  optionContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
