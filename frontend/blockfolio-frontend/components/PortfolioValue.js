import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getPortfolioValue } from '../api';

const PortfolioValue = ({ refreshTrigger }) => {
    const [totalValue, setTotalValue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolioValue = async () => {
            try {
                const value = await getPortfolioValue();
                setTotalValue(value.totalValue);
            } catch (error) {
                console.error('Error fetching portfolio value:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioValue();
    }, [refreshTrigger]); 

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <>
                <Text style={styles.titleText}>Current Portfolio Value</Text>
                <Text style={styles.valueText}>
                        ${totalValue !== null ? totalValue.toFixed(2) : 'N/A'} USDT
                </Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'left',
        paddingBottom: 14,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffab00',
    },
    valueText: {
        paddingTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default PortfolioValue;
