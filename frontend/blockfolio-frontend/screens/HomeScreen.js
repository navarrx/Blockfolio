import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchTopCryptos } from '../api';
import CryptoCard from '../components/CryptoCard';
import SearchCrypto from '../components/SearchCrypto';
import Tab from '../components/Tab';

const HomeScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('TopCryptos');

    const tabs = [
        { key: 'TopCryptos', label: 'Trending' },
        { key: 'TopGainers', label: 'Gainers' },
        { key: 'TopLosers', label: 'Losers' },
    ];

    return (
        <View style={styles.container}>

            <SearchCrypto navigation={navigation} />
            <Text style={styles.title}>Track your cryptos using the best Portfolio app!</Text>
            <View style={styles.line} />

            <Tab 
                tabs={tabs} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />

            <TopCryptoList activeTab={activeTab} />
        </View>
    );
};

const TopCryptoList = ({ activeTab }) => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                setLoading(true);
                const data = await fetchTopCryptos(activeTab);
                setCryptos(data);
            } catch (error) {
                console.error('Error fetching cryptocurrencies:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchCryptos();
    }, [activeTab]);

    return (
        <View style={styles.listContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFF" />
            ) : (
                <FlashList
                    data={cryptos}
                    contentContainerStyle={styles.flashListContent}
                    renderItem={({ item }) => <CryptoCard {...item} />}
                    estimatedItemSize={10}
                />
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000101',
        padding: 20,
    },
    line: {
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        width: '80%',
        marginTop: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    listContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#000101',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        paddingHorizontal: 10,
        marginBottom: 50,
    },
    flashListContent: {
        paddingVertical: 5,
    },
});
