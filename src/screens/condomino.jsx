import React, { useRef } from "react";
import { View, Text, Image, FlatList, ScrollView, StyleSheet } from "react-native";

const servicesBySector = {
  Pizzarias: [
    { id: "1", name: "Pizzaria do João", phone: "(13) 9999-8888" },
    { id: "2", name: "Pizzaria da Ana", phone: "(13) 9999-7777" },
  ],
  Academias: [
    { id: "5", name: "Gym Fit", phone: "(13) 8888-6666" },
    { id: "6", name: "Personal Trainer", phone: "(13) 8888-5555" },
  ],
  Educação: [
    { id: "10", name: "Aulas de Violão", phone: "(13) 7777-4444" },
    { id: "11", name: "Aulas de Inglês", phone: "(13) 7777-3333" },
  ],
};

export default function CondominoPage() {
  const flatListRefs = useRef([]);

  const scrollToStart = (index) => {
    setTimeout(() => {
      const ref = flatListRefs.current[index];
      if (ref) {
        ref.scrollToOffset({ animated: true, offset: 0 });
      }
    }, 5000);
  };

  const renderService = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: "https://via.placeholder.com/100" }}
        style={styles.image}
      />
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.phoneText}>{item.phone}</Text>
    </View>
  );

  const renderSector = (sector, services, index) => (
    <View key={sector} style={styles.sectorContainer}>
      <Text style={styles.sectorTitle}>{sector}</Text>
      <FlatList
        ref={(ref) => (flatListRefs.current[index] = ref)}
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.grid}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => scrollToStart(index)}
        onEndReachedThreshold={0.1}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Anúncios</Text>
      <Text style={styles.subtitle}>
        Os melhores anúncios em um só lugar
      </Text>
      {Object.entries(servicesBySector).map(([sector, services], index) =>
        renderSector(sector, services, index)
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F7F7F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  sectorContainer: {
    marginBottom: 20,
  },
  sectorTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    paddingLeft: 8,
  },
  grid: {
    flexDirection: "row",
  },
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
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#E0E0E0",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  phoneText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});
