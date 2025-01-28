import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ServiceCard from './cardService';

const SectorList = ({ sector, services, onContact }) => (
  <View style={styles.sectorContainer}>
    <Text style={styles.sectorTitle}>{sector}</Text>
    <FlatList
      data={services}
      renderItem={({ item }) => (
        <ServiceCard service={item} onPress={() => onContact(item.phone)} />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      contentContainerStyle={styles.list}
    />
  </View>
);

const styles = StyleSheet.create({
  sectorContainer: { marginBottom: 20 },
  sectorTitle: { fontSize: 18, fontWeight: "600", paddingLeft: 8, marginBottom: 10 },
  list: { flexDirection: "row" },
});

export default SectorList;
