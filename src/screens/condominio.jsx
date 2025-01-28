import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import SectorList from '../components/sectorList';

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

  const openWhatsApp = async (phone) => {
    const url = `https://wa.me/${phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else alert('WhatsApp não está disponível.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Anúncios</Text>
      <Text style={styles.subtitle}>Os melhores anúncios em um só lugar</Text>
      {Object.entries(servicesBySector).map(([sector, services], index) => (
        <SectorList
          key={sector}
          sector={sector}
          services={services}
          onContact={openWhatsApp}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#F7F7F7" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
});
