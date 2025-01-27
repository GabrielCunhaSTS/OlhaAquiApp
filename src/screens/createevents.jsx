import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddEvent() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        eventLocation: '',
        eventDescription: '',
        eventTime: '',
        eventPhotos: [],
    });

    const handleInputChange = (field, value) => {
        let formattedValue = value;

        if (field === 'eventDate') {
            formattedValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
                .slice(0, 10);
        } else if (field === 'eventTime') {
            formattedValue = value.replace(/(\d{2})(\d{2})/, '$1:$2').slice(0, 5);
        }

        setFormData({ ...formData, [field]: formattedValue });
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

    const handleAddEvent = () => {
        Alert.alert('Evento Adicionado', `Evento: ${formData.eventName}`);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.header}>Adicione o Evento</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        {[
                            { label: 'Nome do evento', field: 'eventName' },
                            { label: 'Data', field: 'eventDate' },
                            { label: 'Local', field: 'eventLocation' },
                            { label: 'Descrição', field: 'eventDescription' },
                        ].map(({ label, field }) => (
                            <View key={field} style={styles.inputGroup}>
                                <Text style={styles.label}>{label}</Text>
                                <TextInput
                                    style={styles.input}
                                    label={`Digite o(a) ${label.toLowerCase()}`}
                                    value={formData[field]}
                                    onChangeText={(value) => handleInputChange(field, value)}
                                    multiline={field === 'eventDescription'}
                                    mode="outlined"
                                    theme={{ colors: { primary: '#003366' } }}
                                />
                            </View>
                        ))}

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                label="Digite a hora do evento"
                                value={formData.eventTime}
                                onChangeText={(value) => handleInputChange('eventTime', value)}
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

            <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
                <Text style={styles.addButtonText}>Adicionar Evento</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7F3FA',
        padding: 20,
        justifyContent: 'space-between',
    },
    scrollViewContent: {
        paddingBottom: 10,
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
    addButton: {
        backgroundColor: '#003366',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        elevation: 5,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});
