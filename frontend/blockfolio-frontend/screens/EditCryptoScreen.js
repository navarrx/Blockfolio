import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UpdateRemoveButton from '../components/UpdateRemoveButton';
import { updateCryptoInPortfolio, removeCryptoFromPortfolio } from '../api';

const EditCryptoScreen = ({ route, navigation }) => {
    const { logoURL, currentPrice, symbol, quantity } = route.params;
    const [newQuantity, setNewQuantity] = useState(quantity.toString());

    const handleUpdate = async () => {
        if (!newQuantity) {
            Alert.alert('Error', 'Please enter a valid quantity.');
            return;
        }

        try {
            await updateCryptoInPortfolio(symbol, parseFloat(newQuantity));
            Alert.alert('Success', 'Crypto updated successfully');
            navigation.navigate('Portfolio');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleRemove = async () => {
        try {
            await removeCryptoFromPortfolio(symbol);
            Alert.alert('Success', 'Crypto removed successfully');
            navigation.navigate('Portfolio');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Portfolio')} style={styles.backButton}>
                <Icon name="arrow-back" size={28} color="#ffab00" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Image source={{ uri: logoURL }} style={styles.cryptoImage} />
            <Text style={styles.title}>{symbol}</Text>
            <Text style={styles.priceText}>Current Price: ${currentPrice.toFixed(2)}</Text>
            <View style={styles.line}></View>
            <Text style={styles.title}>Edit your assets amount</Text>
            <TextInput
                style={styles.input}
                value={newQuantity}
                onChangeText={setNewQuantity}
                keyboardType="numeric"
                placeholder="Enter new quantity"
            />
            <View>
                <UpdateRemoveButton label="Update Amount" onPress={handleUpdate} color="#ffab00" textColor='#121212' />
                <UpdateRemoveButton label="Remove from Portfolio" onPress={handleRemove} color="red" textColor='white' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60,
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 18,
        color: '#ffab00',
        marginLeft: 5,
    },
    cryptoImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 15,
    },
    priceText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        marginBottom: 15,
        height: 45,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: '#25282d',
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#ffab00',
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.8,
        width: '40%',
        marginTop: 8,
        marginBottom: 10,
        alignSelf: 'center',
    }
});

export default EditCryptoScreen;