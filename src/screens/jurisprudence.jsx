import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from "react-native";

const jurisprudenceData = [
  {
    id: "1",
    title: "Ação Direta de Inconstitucionalidade - Lei Estadual",
    summary:
      "Lei estadual que dispõe sobre a criação de cargos em comissão. Violação dos princípios da moralidade e impessoalidade. Inconstitucionalidade formal e material reconhecida.",
    date: "15/01/2025",
    source: "STF, ADI 123456/DF",
    link: "https://www.stf.jus.br/portal/jurisprudencia/listarJurisprudencia.asp?s1=123456&l=1",
  },
  {
    id: "2",
    title: "Plano de Saúde Coletivo - Rescisão Unilateral",
    summary:
      "Contrato de plano de saúde coletivo. Rescisão unilateral pela operadora. Necessidade de notificação prévia ao consumidor. Aplicação do Código de Defesa do Consumidor.",
    date: "10/12/2024",
    source: "STJ, REsp 987654/SP",
    link: "https://www.stj.jus.br/web/stj/jurisprudencia/doc.jsp?s1=987654&l=1",
  },
  {
    id: "3",
    title: "Indenização por Danos Morais - Rede Social",
    summary:
      "Indenização por danos morais devido à publicação de matéria ofensiva em rede social. Direito à imagem e à honra. Dever de indenizar reconhecido.",
    date: "05/11/2024",
    source: "TJSP, Apelação Cível 567890/SP",
    link: "https://www.tjsp.jus.br/portal/jurisprudencia/listarJurisprudencia.asp?s1=567890&l=1",
  },
];

export default function JurisprudencePage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Jurisprudência Selecionada</Text>
      {jurisprudenceData.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>Título: {item.title}</Text>
          <Text style={styles.summary}>Ementa: {item.summary}</Text>
          <Text style={styles.date}>Data: {item.date}</Text>
          <Text style={styles.source}>Fonte: {item.source}</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(item.link).catch((err) =>
                console.error("Erro ao abrir o link:", err)
              )
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Acessar Jurisprudência</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
      },
      header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
        color: "#333",
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
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#444",
      },
      description: {
        fontSize: 14,
        marginBottom: 6,
        color: "#666",
      },
      date: {
        fontSize: 12,
        color: "#888",
      },
      source: {
        fontSize: 12,
        fontStyle: "italic",
        color: "#555",
      },
      link: {
        fontSize: 14,
        color: "#1E90FF",
        textDecorationLine: "underline",
        marginTop: 8,
      },
});
