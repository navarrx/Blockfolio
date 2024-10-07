import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DetailedCryptoCard from '../components/DetailedCryptoCard';
import { fetchCryptoDetails, addCryptoToPortfolio } from '../api';
import { useAuth } from '../context/AuthContext';

const CryptoDetailsScreen = ({ route, navigation }) => {
  const { symbol } = route.params;
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getCryptoDetails = async () => {
      try {
        const data = await fetchCryptoDetails(symbol);
        setCrypto(data);
      } catch (error) {
        console.error('Error fetching cryptocurrency details:', error);
      } finally {
        setLoading(false);
      }
    };

    getCryptoDetails();
  }, [symbol]);

  const handleAddToPortfolio = () => {
    if (quantity && parseFloat(quantity) > 0) {
      addCryptoToPortfolio(symbol, parseFloat(quantity));
      navigation.navigate('Portfolio');
    } else {
      alert('Please enter a valid quantity');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFF" />
        <Text style={styles.loadingText}>Loading cryptocurrency details...</Text>
      </View>
    );
  }

  if (!crypto) {
    return <Text style={styles.errorText}>Error loading cryptocurrency details.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="#ffab00" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <DetailedCryptoCard crypto={crypto} />

      {isAuthenticated && (
        <View style={styles.addPortfolioContainer}>
          <Text style={styles.addPortfolioText}>Add to Portfolio</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            placeholderTextColor="#d3d3d3"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddToPortfolio}>
            <Icon name="add" size={28} color="#000" />
            <Text style={styles.addButtonText}>Add {crypto.SYMBOL}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000101',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFF',
  },
  container: {
    padding: 20,
    backgroundColor: '#000101',
    flexGrow: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 18,
    color: '#ffab00',
    marginLeft: 5,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  addPortfolioContainer: {
    marginTop: 20,
    backgroundColor: '#1a1a1d',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  addPortfolioText: {
    color: '#ffab00',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2e2e30',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffab00',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
  },
});

export default CryptoDetailsScreen;
