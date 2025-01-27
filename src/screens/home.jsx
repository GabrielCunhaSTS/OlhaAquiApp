import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ScrollView, View, TouchableOpacity, Text, Linking } from "react-native";

export default function HomePage({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await fetch("https://jornaldaorla.com.br/wp-json/wp/v2/posts?per_page=5");

      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Resposta não é um JSON válido.");
      }

      const data = await response.json();

      const formattedNews = await Promise.all(data.map(async (item) => {
        const imageId = item.featured_media;
        let imageUrl = "";

        if (imageId) {
          const mediaResponse = await fetch(`https://jornaldaorla.com.br/wp-json/wp/v2/media/${imageId}`);
          if (!mediaResponse.ok) {
            console.warn(`Erro ao buscar imagem para o post ${item.id}`);
          } else {
            const mediaData = await mediaResponse.json();
            imageUrl = mediaData.source_url;
          }
        }

        const date = new Date(item.date);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        return {
          id: item.id,
          title: item.title.rendered,
          summary: item.excerpt.rendered.replace(/<[^>]+>/g, "").substring(0, 150) + "...",
          date: formattedDate,
          image: imageUrl,
          link: item.link,
        };
      }));

      setNews(formattedNews);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image source={require('../img/objtivo.png')} style={styles.image} />
        <View style={styles.textWrapper}>
          <Text style={styles.overlayText}>
            Divulgue anúncios e notícias exclusivas para sua comunidade
          </Text>
          <TouchableOpacity 
            style={styles.contactButton} 
            onPress={() => navigation.navigate("AddEvent")}
          >
            <Text style={styles.buttonText}>Entre em contato</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentBlock}>
        <Text style={styles.title}>Notícias e Anúncios em um Só Lugar</Text>
        <Text style={styles.descriptionText}>
          Anuncie e publique suas matérias em um único lugar! Participe de nossa comunidade online para divulgar anúncios e compartilhar notícias com um público amplo e engajado. Fique por dentro das últimas novidades do mercado e mantenha-se conectado.
        </Text>
        <TouchableOpacity 
          style={styles.announceButton} 
          onPress={() => console.log("Anuncie aqui pressionado")}
        >
          <Text style={styles.buttonText}>Anuncie aqui</Text>
        </TouchableOpacity>
        <Image source={require('../img/anuncie.png')} style={styles.announceImage} />
      </View>

      <View style={styles.darkSection}>
        <Text style={styles.sectionTitle}>Veja os anúncios que te interessam</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconBlock}>
            <TouchableOpacity onPress={() => navigation.navigate("CondominoPage")}>
              <Image
                source={require('../img/group.png')}
                style={[styles.icon, { width: 70, height: 70 }]}
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>Condomino</Text>
          </View>

          <View style={styles.iconBlock}>
            <TouchableOpacity onPress={() => navigation.navigate("CondominioPage")}>
              <Image
                source={require('../img/building.png')}
                style={[styles.icon, { width: 70, height: 70 }]}
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>Condominio</Text>
          </View>
        </View>
      </View>

      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>Notícias Condomínios</Text>
        <Text style={styles.subtitulo}>
          Um jornal virtual para anunciantes e notícias sobre condomínios.
        </Text>

        {loading ? (
          <Text>Carregando notícias...</Text>
        ) : (
          news.map((item) => (
            <View key={item.id} style={styles.newsCard}>
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsSummary}>{item.summary}</Text>

              <View style={styles.newsFooter}>
                <Text style={styles.newsDate}>Data: {item.date}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.readMoreButton}>Ler mais</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        
        <TouchableOpacity 
          onPress={() => navigation.navigate("NewsPage")}
          style={styles.viewMoreButton} 
        >
          <Text style={styles.buttonText}>Ver mais notícias</Text>
        </TouchableOpacity>

        <View style={styles.calendarSection}>
        <Text style={styles.sectionTitleCalendar}>Calendário 2025</Text>
        <Text style={styles.calendarSubtitle}>
          Organize seu ano com facilidade! Confira as principais datas e eventos de 2025 de forma prática e visual.
        </Text>
        <Image source={require('../img/Calendario.jpg')} style={styles.calendarImage} />
      </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#E0F0FA",
  },
  descriptionText: {
    fontSize: 14.5,
    color: '#555',
    marginBottom: 15,
    textAlign: 'left',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  announceImage: {
    position: 'absolute',
    width: 175,
    height: 175,
    top: '52.8%',
    left: '56.7%',
    resizeMode: 'contain',
  },
  icon: {
    marginBottom: 5,
  },
  imageContainer: {
    marginTop: 20,
    padding: 10,
    height: 250,
  },
  image: {
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  textWrapper: {
    position: 'absolute',
    width: '56%',
    bottom: '32%',
    left: '49.5%',
  },
  overlayText: {
    fontSize: 16.5,
    color: '#000',
    textAlign: 'right',
    paddingRight: 32,
    padding: 10,
  },
  contentBlock: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  title: {
    fontSize: 21,
    marginBottom: 10,
  },
  darkSection: {
    backgroundColor: '#003366',
    padding: 20,
    marginTop: 20,
    width: '100%',
    borderRadius: 5,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 12,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconBlock: {
    width: '50%',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  newsSection: {
    padding: 10,
    backgroundColor: '#8DB6BC',
    marginTop: 20,
    borderRadius: 10,
  },
  newsCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  newsTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingLeft: 6,
  },
  newsSummary: {
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 6,
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 6,
  },
  readMoreButton: {
    fontSize: 14,
    backgroundColor: '#0E8991',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center',
  },
  announceButton: {
    backgroundColor: '#1A4568',
    width: 170,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30
  },
  contactButton: {
    marginLeft: 18,
    borderRadius: 10,
    padding: 2,
    width: 170,
    height: 30,
    backgroundColor: '#0E8991',
    fontWeight: 'normal',
  },
  calendarSection: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 30,
    borderRadius: 20,
  },
  sectionTitleCalendar: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  calendarSubtitle:{
    padding: 12,
    fontSize: 17
  },
  calendarImage: {
    width: '100%',
    height: 720,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  viewMoreButton: {
    fontSize: 16,
    backgroundColor: '#0E8991',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
