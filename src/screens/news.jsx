import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";

export default function NewsPage({ navigation }) {
  const [newsOrla, setNewsOrla] = useState([]);
  const [newsDiario, setNewsDiario] = useState([]);
  const [loadingOrla, setLoadingOrla] = useState(true);
  const [loadingDiario, setLoadingDiario] = useState(true);

  useEffect(() => {
    fetchNewsOrla();
    fetchNewsDiario();
  }, []);

  const fetchNewsOrla = async () => {
    try {
      const response = await fetch("https://jornaldaorla.com.br/wp-json/wp/v2/posts?per_page=9");
      const data = await response.json();
      const formattedNews = await formatNewsData(data, "https://jornaldaorla.com.br");
      setNewsOrla(formattedNews);
      setLoadingOrla(false);
    } catch (error) {
      console.error("Erro ao buscar notícias do Jornal da Orla:", error);
      setLoadingOrla(false);
    }
  };

  const fetchNewsDiario = async () => {
    try {
      const response = await fetch("https://www.cnnbrasil.com.br/wp-json/wp/v2/posts?per_page=5");
      const data = await response.json();
      const formattedNews = await formatNewsData(data, "https://www.cnnbrasil.com.br");
      setNewsDiario(formattedNews);
      setLoadingDiario(false);
    } catch (error) {
      console.error("Erro ao buscar notícias do Diário do Litoral:", error);
      setLoadingDiario(false);
    }
  };

  const formatNewsData = async (data, baseUrl) => {
    return Promise.all(
      data.map(async (item) => {
        const imageUrl = item.featured_media ? await getImageUrl(item.featured_media, baseUrl) : null;
        return {
          id: item.id,
          title: item.title.rendered,
          summary: item.excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 60) + "...",
          date: formatDate(item.date),
          image: imageUrl,
          link: item.link,
        };
      })
    );
  };

  const getImageUrl = async (imageId, baseUrl) => {
    try {
      const mediaResponse = await fetch(`${baseUrl}/wp-json/wp/v2/media/${imageId}`);
      const mediaData = await mediaResponse.json();
      return mediaData.source_url;
    } catch (error) {
      console.error("Erro ao obter imagem:", error);
      return "";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notícias da sua região</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jornal da Orla</Text>
        {loadingOrla ? (
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        ) : (
          newsOrla.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <Image source={{ uri: item.image || "https://via.placeholder.com/100" }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSummary}>{item.summary}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.readMoreButton}>
                  <Text style={styles.readMoreText}>Ler mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CNN Brasil</Text>
        {loadingDiario ? (
          <Text style={styles.loadingText}>Carregando notícias...</Text>
        ) : (
          newsDiario.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <Image source={{ uri: item.image || "https://via.placeholder.com/100" }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSummary}>{item.summary}</Text>
                <Text style={styles.newsDate}>{item.date}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.readMoreButton}>
                  <Text style={styles.readMoreText}>Ler mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
  newsCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    elevation: 3,
  },
  newsImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  newsSummary: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  newsDate: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  readMoreButton: {
    backgroundColor: "#0e8991",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  readMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
