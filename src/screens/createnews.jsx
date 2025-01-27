import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddNew() {
    const [newsData, setNewsData] = useState({
        title: '',
        description: '',
        category: '',
        date: '',
    });

    const handleInputChange = (field, value) => {
        setNewsData({ ...newsData, [field]: value });
    };

    const handleAddPhoto = () => {
            const options = {
                mediaType: 'photo',
                selectionLimit: 1, 
            };
    
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    Alert.alert('Cancelado', 'Nenhuma foto foi selecionada.');
                } else if (response.errorCode) {
                    Alert.alert('Erro', 'Ocorreu um erro ao abrir o gerenciador de fotos.');
                } else if (response.assets && response.assets.length > 0) {
                    const photoUri = response.assets[0].uri;
                    setFormData((prevData) => ({
                        ...prevData,
                        eventPhotos: [...prevData.eventPhotos, photoUri],
                    }));
                }
            });
        };

    const handleSubmit = () => {
        Alert.alert("Notícia cadastrada com sucesso!");
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.header}>Adicione a Notícia</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Título</Text>
                            <TextInput
                                style={styles.input}
                                label="Digite o título"
                                value={newsData.title}
                                onChangeText={(value) => handleInputChange('title', value)}
                                mode="outlined"
                                theme={{ colors: { primary: '#003366' } }}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={styles.input}
                                label="Digite a descrição"
                                value={newsData.description}
                                onChangeText={(value) => handleInputChange('description', value)}
                                multiline
                                mode="outlined"
                                theme={{ colors: { primary: '#003366' } }}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Categoria</Text>
                            <TextInput
                                style={styles.input}
                                label="Digite a categoria"
                                value={newsData.category}
                                onChangeText={(value) => handleInputChange('category', value)}
                                mode="outlined"
                                theme={{ colors: { primary: '#003366' } }}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Data</Text>
                            <TextInput
                                style={styles.input}
                                label="Digite a data (dd/mm/yyyy)"
                                value={newsData.date}
                                onChangeText={(value) =>
                                    handleInputChange('date', value.replace(/\D/g, '').replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3').slice(0, 10))
                                }
                                keyboardType="numeric"
                                mode="outlined"
                                theme={{ colors: { primary: '#003366' } }}
                            />
                        </View>
                    </Card.Content>
                </Card>
                <TouchableOpacity style={styles.photoButton} onPress={handleAddPhoto}>
                    <Text style={styles.photoButtonText}>Adicionar Foto</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Cadastrar Notícia</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F3FA',
    },
    scrollView: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
        marginTop: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#34495e',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: '#003366',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    photoButton: {
        flexDirection: 'row',
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        marginTop: 30,
    },
    photoButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
});
