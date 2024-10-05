import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function NewsCard({
    title,
    imageUrl,
    url,
    body,
    publishedOn,
}) {
    const resizeText = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length > maxLength) {
            return words.slice(0, maxLength).join(' ') + '...';
        }
        return text;
    };

    return (
        <View style={styles.newsItem}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View style={styles.newsInfo}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.line} />
                <Text style={styles.body}>{resizeText(body, 30)}</Text>
                <Text style={styles.publishedOn}>
                    Published on: {new Date(publishedOn).toDateString()}
                </Text>
            </View>
            <View style={styles.changeContainer}>
                <TouchableOpacity onPress={() => Linking.openURL(url)}>
                    <Text style={styles.label}>Read More</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    newsItem: {
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#1E1E1E', // Fondo oscuro
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden', // Para redondear los bordes de la imagen
    },
    image: {
        width: '100%',
        height: 200,
    },
    newsInfo: {
        padding: 15,
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF', // Color blanco para el título
        marginBottom: 5,
    },
    body: {
        fontSize: 14,
        color: '#CCCCCC', // Color gris claro para el cuerpo
        marginBottom: 10,
    },
    publishedOn: {
        fontSize: 12,
        color: '#AAAAAA', // Color gris más claro para la fecha
        marginTop: 5,
    },
    changeContainer: {
        alignItems: 'flex-end',
        padding: 10,
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    label: {
        fontSize: 16,
        color: '#ffab00',
        fontWeight: 'bold',
        paddingRight: 10,
    },
});
