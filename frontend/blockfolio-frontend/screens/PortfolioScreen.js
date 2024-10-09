import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchUserPortfolio } from '../api';
import PortfolioValue from '../components/PortfolioValue';
import PortfolioSearchCrypto from '../components/PortfolioSearchCrypto';
import PortfolioCryptoCard from '../components/PortfolioCryptoCard';

const PortfolioScreen = ({ navigation }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetchUserPortfolio();
        setPortfolio(response);
        
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetchUserPortfolio();
      setPortfolio(response);
      setRefreshTrigger(prev => prev + 1);
  
    } catch (error) {
      console.error('Error fetching portfolio during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };  

  const renderItem = ({ item }) => (
    <TouchableOpacity>
        <PortfolioCryptoCard
            symbol={item.symbol}
            logoURL={item.logoURL}
            quantity={item.quantity}
            currentPrice={item.currentPrice}
            totalValue={item.totalValue}
            onRemove={(removedSymbol) => {
                setPortfolio(portfolio.filter(crypto => crypto.symbol !== removedSymbol));
            }}
            navigation={navigation}
        />
    </TouchableOpacity>
);  

  return (
    <View style={[styles.container, { paddingBottom: 60 }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Assets</Text>
        <PortfolioSearchCrypto navigation={navigation} />
      </View>
      <View style={styles.line}></View>
      <PortfolioValue refreshTrigger={refreshTrigger} />
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <FlashList
          data={portfolio}
          contentContainerStyle={styles.flashListContent}
          renderItem={renderItem}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 25,
    paddingLeft: 20,
  },
  subtitle: {
    fontSize: 22,
    color: 'darkgrey',
    marginBottom: 10,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#555',
    marginBottom: 12,
    alignSelf: 'center',
  },
  flashListContent: {
    paddingVertical: 10,
  },
});

export default PortfolioScreen;