import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CircleButton = ({ onPress, imageSource, label }) => (
  <View style={styles.optionContainer}>
    <TouchableOpacity
      style={styles.circle}
      onPress={onPress}
      accessible
      accessibilityLabel={`Botão para ${label}`}
    >
      <Image source={imageSource} style={styles.icon} />
    </TouchableOpacity>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  circle: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (width * 0.4) / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    width: 70,
    height: 70,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});

export default CircleButton;
