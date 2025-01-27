import React, { useRef } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, TouchableOpacity, Linking } from "react-native";

const servicesBySector = {
  "Serralheria": [
    { id: '1', name: 'Pizzaria do João', phone: '1399998888', image: require('../img/anuncio1.jpeg') },
    { id: '2', name: 'Pizzaria da Ana', phone: '1399997777', image: require('../img/anuncio2.jpeg') },
    { id: '3', name: 'Gym Fit', phone: '1388886666', image: require('../img/anuncio3.jpeg') },
    { id: '4', name: 'Personal Trainer', phone: '1388885555', image: require('../img/anuncio4.jpeg') },
    { id: '5', name: 'Aulas de Violão', phone: '1377774444', image: require('../img/anuncio5.jpeg') },
    { id: '8', name: 'Reformas Beta', phone: '(13) 5555-2222', image: require('../img/anuncio8.jpeg') },
    { id: '9', name: 'Manutenção Gama', phone: '(13) 5555-3333', image: require('../img/anuncio9.jpeg') },
  ],
  "Construção": [
    { id: '1', name: 'Pizzaria do João', phone: '(13) 9999-8888', image: require('../img/anuncio1.jpeg') },
    { id: '2', name: 'Pizzaria da Ana', phone: '(13) 9999-7777', image: require('../img/anuncio2.jpeg') },
    { id: '3', name: 'Gym Fit', phone: '(13) 8888-6666', image: require('../img/anuncio2.jpeg') },
    { id: '4', name: 'Personal Trainer', phone: '(13) 8888-5555', image: require('../img/anuncio4.jpeg') },
    { id: '5', name: 'Aulas de Violão', phone: '(13) 7777-4444', image: require('../img/anuncio5.jpeg') },
    { id: '6', name: 'Aulas de Inglês', phone: '(13) 7777-3333', image: require('../img/anuncio6.jpeg') },
    { id: '7', name: 'Construtora Alfa', phone: '(13) 5555-1111', image: require('../img/anuncio7.jpeg') },
    { id: '8', name: 'Reformas Beta', phone: '(13) 5555-2222', image: require('../img/anuncio8.jpeg') },
    { id: '9', name: 'Manutenção Gama', phone: '(13) 5555-3333', image: require('../img/anuncio9.jpeg') },
  ],
  "Manutenção": [
    { id: '1', name: 'Pizzaria do João', phone: '(13) 9999-8888', image: require('../img/anuncio1.jpeg') },
    { id: '2', name: 'Pizzaria da Ana', phone: '(13) 9999-7777', image: require('../img/anuncio2.jpeg') },
    { id: '3', name: 'Gym Fit', phone: '(13) 8888-6666', image: require('../img/anuncio3.jpeg') },
    { id: '4', name: 'Personal Trainer', phone: '(13) 8888-5555', image: require('../img/anuncio4.jpeg') },
    { id: '5', name: 'Aulas de Violão', phone: '(13) 7777-4444', image: require('../img/anuncio5.jpeg') },
    { id: '6', name: 'Aulas de Inglês', phone: '(13) 7777-3333', image: require('../img/anuncio6.jpeg') },
    { id: '7', name: 'Construtora Alfa', phone: '(13) 5555-1111', image: require('../img/anuncio7.jpeg') },
    { id: '8', name: 'Reformas Beta', phone: '(13) 5555-2222', image: require('../img/anuncio8.jpeg') },
    { id: '9', name: 'Manutenção Gama', phone: '(13) 5555-3333', image: require('../img/anuncio9.jpeg') },
  ],
};

export default function CondominioPage() {
  const flatListRefs = useRef([]);

  const scrollToStart = (index) => {
    setTimeout(() => {
      const ref = flatListRefs.current[index];
      if (ref) {
        ref.scrollToOffset({ animated: true, offset: 0 });
      }
    }, 5000);
  };

  const openWhatsApp = (phone) => {
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url).catch(() => {
      alert('Não foi possível abrir o WhatsApp.');
    });
  };

  const renderService = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Image 
          source={item.image} 
          style={styles.image}
        />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
      <TouchableOpacity 
        style={styles.contactInfo}
        onPress={() => openWhatsApp(item.phone)}
      >
        <Image
          source={require('../img/whatsapp.png')}
          style={[styles.icon, { width: 20, height: 20 }]}
        /> 
        <Text style={styles.phoneText}>Entrar em contato</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSector = (sector, services, index) => (
    <View key={sector} style={styles.sectorContainer}>
      <Text style={styles.sectorTitle}>{sector}</Text>
      <FlatList
        ref={(ref) => flatListRefs.current[index] = ref}
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.grid}
        showsHorizontalScrollIndicator={true}
        onEndReached={() => scrollToStart(index)}
        onEndReachedThreshold={0.1}
      />
      <View style={styles.separator} />
    </View>
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
    >
      <Text style={styles.title}>Anúncios</Text>
      <Text style={styles.subtitle}>Os melhores anúncios em um só lugar</Text>
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
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  phoneText: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginLeft: 5,
  },
});
