import React, { useState, useEffect } from 'react';
import { View, Text, Image, Linking, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { fetchCryptoDetails } from '../api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CryptoDetailsScreen = ({ route, navigation }) => {
  const { symbol } = route.params;
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón para volver a la pantalla anterior */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="#ffab00" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: crypto.LOGO_URL }} style={styles.logo} />
          </View>
          <Title style={styles.title}>{crypto.NAME} ({crypto.SYMBOL})</Title>
          <Paragraph style={styles.description}>{crypto.ASSET_DESCRIPTION_SNIPPET}</Paragraph>
        </Card.Content>

        <Card.Content style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price:</Text>
            <Text style={styles.infoValue}>${crypto.PRICE_USD.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Cap:</Text>
            <Text style={styles.infoValue}>${Number(crypto.TOTAL_MKT_CAP_USD).toLocaleString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Max Supply:</Text>
            <Text style={styles.infoValue}>{Number(crypto.SUPPLY_MAX).toLocaleString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Supply:</Text>
            <Text style={styles.infoValue}>{Number(crypto.SUPPLY_TOTAL).toLocaleString()}</Text>
          </View>
        </Card.Content>

        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => Linking.openURL(crypto.WEBSITE_URL)}
            style={styles.button}
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
          >
            Visit Website
          </Button>
        </Card.Actions>
      </Card>
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
  card: {
    elevation: 2,
    borderRadius: 15,
    backgroundColor: '#1a1a1d',
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  content: {
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#2e2e30',
    padding: 20,
    borderRadius: 50,
    marginBottom: 15,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#d3d3d3',
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoLabel: {
    fontSize: 18,
    color: '#d3d3d3',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 18,
    color: '#FFF',
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#ffab00',
  },
  buttonContent: {
    paddingVertical: 5,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 16,
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
});

export default CryptoDetailsScreen;
