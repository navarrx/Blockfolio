import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const SearchCrypto = ({ navigation }) => {
  const [symbol, setSymbol] = useState('');

  const searchCrypto = () => {
    if (!symbol || symbol.trim() === "") {
      alert("Please enter a valid symbol");
      return;
    }
    navigation.navigate('CryptoDetails', { symbol });
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search crypto by Symbol (e.g. BTC, ETH)"
        placeholderTextColor="#999da0"
        value={symbol}
        onChangeText={setSymbol}
        onSubmitEditing={searchCrypto} // Ejecuta la búsqueda al presionar Enter
        returnKeyType="search"
        style={styles.searchInput}
        autoCapitalize="none" // Para evitar que se capitalicen las letras automáticamente
      />
    </View>
  );
};

export default SearchCrypto;

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    marginTop: 25,
    marginBottom: 15,
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
  },
});
