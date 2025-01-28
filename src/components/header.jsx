import React from "react";
import { View, Image, StyleSheet } from "react-native";

const HeaderLogo = () => (
  <View style={styles.headerContainer}>
    <Image source={require("../img/logo.png")} style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 50,
  },
});

export default HeaderLogo;
