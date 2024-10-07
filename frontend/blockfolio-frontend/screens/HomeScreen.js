import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import PortfolioValue from '../components/PortfolioValue';
import SearchCrypto from '../components/SearchCrypto';
import Tab from '../components/Tab';
import TopCryptoList from '../components/TopCryptoList';

const HomeScreen = ({ navigation }) => {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState('TopCryptos');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const tabs = [
        { key: 'TopCryptos', label: 'Trending' },
        { key: 'TopGainers', label: 'Gainers' },
        { key: 'TopLosers', label: 'Losers' },
    ];

    const handleRefresh = () => {
        setRefreshTrigger(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <SearchCrypto navigation={navigation} />
            <Text style={styles.title}>Track your cryptos using the best Portfolio app!</Text>
            <View style={styles.line} />
            {isAuthenticated && <PortfolioValue refreshTrigger={refreshTrigger} />}
            <Tab 
                tabs={tabs} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            <TopCryptoList activeTab={activeTab} navigation={navigation} onRefresh={handleRefresh} />
        </View>
    );
};

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
});

export default HomeScreen;