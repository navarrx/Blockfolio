import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import CryptoCard from '../components/CryptoCard';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Blockfolio</Text>
            <Button 
                title="Go to Login" 
                onPress={() => navigation.navigate('Login')} 
            />
            <TopCryptoList />
        </View>
    );
};

const TopCryptoList = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get(
                    'http://192.168.18.13:8080/api/cryptocurrencies/topCryptos'
                );
                console.log(response.data);
                setCryptos(response.data);
            } catch (error) {
                console.error('Error fetching cryptocurrencies:', error);
            }
        };

        fetchCryptos();
    }, []);

    return (
        <View style={styles.listContainer}>
            <FlashList
                data={cryptos}
                contentContainerStyle={styles.flashListContent}
                renderItem={({ item }) => <CryptoCard {...item} />}
                estimatedItemSize={10}
            />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFDF6',
      padding: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
  },
  listContainer: {
      flex: 1,
      width: '100%',
      maxHeight: '60%',
      backgroundColor: '#DDDDDD',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
  },
  flashListContent: {
      paddingVertical: 5,
  },
});
