import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("dúvida");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (name && email && reason && message) {
      Alert.alert(
        "Mensagem Enviada!",
        `${name}, sua mensagem foi enviada!`
      );
      setName("");
      setEmail("");
      setReason("dúvida");
      setMessage("");
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Contato</Text>
      <Text style={styles.description}>
        Entre em contato conosco, tire dúvidas, veja como anunciar, faça denúncias.
      </Text>

      <Text style={styles.subtitle}>Formulário de Contato</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={reason}
          onValueChange={(itemValue) => setReason(itemValue)}
        >
          <Picker.Item label="Escolha um motivo" value="dúvida" />
          <Picker.Item label="Fazer anúncio" value="anúncio" />
          <Picker.Item label="Denúncia" value="denúncia" />
        </Picker>
      </View>
      <TextInput
        style={styles.inputLarge}
        placeholder="Escreva sua mensagem"
        multiline={true}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Informações</Text>
      <Text style={styles.infoText}>Email:</Text>
      <Text style={styles.infoText}>Telefone:</Text>
      <Text style={styles.infoText}>
        Endereço: R CARIJOS, 2044, São Vicente - SP
      </Text>
      <Text style={styles.infoText}>CNPJ: 28.470.432/0001-85</Text>
      <Text style={styles.infoText}>Administrador Comercial: Marcelo Juvenal</Text>

      <Text style={styles.subtitle}>Desenvolvedores</Text>
      <Text style={styles.infoText}>Dev. Sênior: Vincenzo F. Di Giacomo</Text>
      <Text style={styles.infoText}>Dev. Júnior: Gabriel da Cunha A. Santos</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#E0F2F9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    marginBottom: 15,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  picker: {
    height: 40, 
    color: "#000",
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 7,
    padding: 10,
    marginBottom: 20,
    height: 100,
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    width: '45%',
    backgroundColor: "#0C313A",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
