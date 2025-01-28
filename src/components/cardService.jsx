import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ServiceCard = ({ service, onPress }) => (
  <View style={styles.card}>
    <Image source={service.image} style={styles.image} />
    <Text style={styles.cardText}>{service.name}</Text>
    <TouchableOpacity style={styles.contactInfo} onPress={onPress}>
      <Image source={require('../img/whatsapp.png')} style={styles.icon} />
      <Text style={styles.phoneText}>Entrar em contato</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: "100%", height: 100, borderRadius: 8 },
  cardText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  contactInfo: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 },
  icon: { width: 20, height: 20 },
  phoneText: { marginLeft: 5, fontSize: 14, color: "#555" },
});

export default ServiceCard;
