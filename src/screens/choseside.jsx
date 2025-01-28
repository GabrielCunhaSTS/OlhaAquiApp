import React from "react";
import { View, StyleSheet } from "react-native";
import CircleButton from "../components/chosesideBtn";

export default function ChooseSide({ navigation }) {
  const handleNavigation = (screenName) => {
    if (!navigation) {
      console.error("Navigation prop is missing");
      return;
    }
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <CircleButton
        onPress={() => handleNavigation("CondominoPage")}
        imageSource={require("../img/group.png")}
        label="Condomínio"
      />
      <CircleButton
        onPress={() => handleNavigation("CondominioPage")}
        imageSource={require("../img/building.png")}
        label="Condômino"
      />
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
});
