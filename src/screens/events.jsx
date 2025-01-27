import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const simulatedData = [
        {
          id: "1",
          title: "Festival de Música de Santos",
          date: "25/02/2025",
          location: "Praça das Bandeiras",
          description: "Um evento repleto de atrações musicais e culturais.",
        },
        {
          id: "2",
          title: "Feira de Artesanato",
          date: "01/03/2025",
          location: "Orla da Praia",
          description: "Produtos artesanais únicos para todos os gostos.",
        },
        {
          id: "3",
          title: "Corrida Santos Night Run",
          date: "15/04/2025",
          location: "Avenida da Praia",
          description: "Corrida noturna com percurso de 5km e 10km.",
        },
      ];
      setEvents(simulatedData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0073e6" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Olha aqui Eventos</Text>
      <Text style={styles.subTitle}>Veja os eventos que estão acontecendo na região</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.info}>Data: {item.date}</Text>
            <Text style={styles.info}>Local: {item.location}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#e6f4ff",
      },
      headerContainer: {
        marginBottom: 20,
        alignItems: "center",
      },
      mainTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000",
      },
      subTitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
      },
      card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      },
      title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0073e6",
      },
      info: {
        fontSize: 14,
        color: "#555",
      },
      description: {
        fontSize: 14,
        marginTop: 8,
        color: "#666",
      },
});
