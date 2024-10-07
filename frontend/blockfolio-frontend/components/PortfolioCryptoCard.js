import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function PortfolioCryptoCard({
    symbol,
    logoURL,
    quantity,
    currentPrice,
    totalValue,
    onRemove,
    navigation
}) {

    return (
        <View style={styles.cryptoItem}>
            <View style={styles.row}>
                <View style={styles.logoColumn}>
                    <Image source={{ uri: logoURL }} style={styles.logo} />
                </View>
                <View style={styles.column}>
                    <Text style={styles.symbol}>{(symbol || 'N/A').toUpperCase()}</Text>
                    <Text style={styles.quantity}>Quantity: {quantity !== undefined ? quantity : 'N/A'}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.price}>
                        Price: ${currentPrice !== undefined ? currentPrice.toFixed(2) : 'N/A'}
                    </Text>
                    <Text style={styles.totalValue}>
                        Value: ${totalValue !== undefined ? totalValue.toFixed(2) : 'N/A'}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('EditCryptoScreen', { logoURL, currentPrice, symbol, quantity })}>
                    <Entypo name="edit" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cryptoItem: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#F7F9FC',
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderBottomWidth: 3,
        borderBottomColor: '#ffab00',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoColumn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    column: {
        flex: 1,
        paddingHorizontal: 5,
    },
    symbol: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#000',
        textAlign: 'right',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'right',
    },
    removeText: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 10,
    },  
});