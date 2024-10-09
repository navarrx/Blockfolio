import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchTopCryptos } from '../api';
import CryptoCard from './CryptoCard';

const TopCryptoList = ({ activeTab, navigation, onRefresh }) => {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchCryptos = async () => {
        try {
            setLoading(true);
            const data = await fetchTopCryptos(activeTab);
            if (data) {
                setCryptos(data);
            }
        } catch (error) {
            console.error('Error fetching top cryptos:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchCryptos();
    }, [activeTab]);

    const onRefreshHandler = async () => {
        setRefreshing(true);
        await fetchCryptos();
        onRefresh();
    };

    return (
        <View style={styles.listContainer}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFF" style={styles.loader} />
            ) : (
                <FlashList
                    data={cryptos}
                    contentContainerStyle={styles.flashListContent}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('CryptoDetailsScreen', { symbol: item.symbol })}>
                            <CryptoCard {...item} />
                        </TouchableOpacity>
                    )}
                    estimatedItemSize={10}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefreshHandler}
                            tintColor="#FFF"
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    loader: {
        marginTop: 20,
    },
});

export default TopCryptoList;