import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const PortfolioSearchCrypto = ({ navigation }) => {
  const [symbol, setSymbol] = useState('');

  const searchCrypto = () => {
    if (!symbol || symbol.trim() === "") {
      alert("Please enter a valid symbol");
      return;
    }
    navigation.navigate('CryptoDetailsScreen', { symbol });
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search by Symbol (e.g. BTC)"
        placeholderTextColor="#999da0"
        value={symbol}
        onChangeText={setSymbol}
        onSubmitEditing={searchCrypto}
        returnKeyType="search"
        style={styles.searchInput}
        autoCapitalize="none"
      />
    </View>
  );
};

export default PortfolioSearchCrypto;

const styles = StyleSheet.create({
  searchContainer: {
    width: '60%',
    marginTop: 25,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    },
  searchInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 20, 
    paddingHorizontal: 15,
    backgroundColor: '#25282d',
    color: 'white',
  },
});