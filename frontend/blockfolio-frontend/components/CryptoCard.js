import { View, Text, Image, StyleSheet } from 'react-native';

export default function CryptoCard({
    logoURL,
    name,
    symbol,
    price,
    percentChange,
}) {
    return (
        <View style={styles.cryptoItem}>
            <Image source={{ uri: logoURL }} style={styles.logo} />
            <View style={styles.cryptoInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.symbol}>{symbol}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.changeContainer}>
                <Text style={styles.label}>24hr Change</Text>
                <Text style={styles.percentChange}>{percentChange}%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cryptoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FFFDF6',
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    cryptoInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    symbol: {
        fontSize: 14,
        color: '#888',
    },
    price: {
        fontSize: 16,
        color: '#000',
    },
    changeContainer: {
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 12,
        color: '#888',
    },
    percentChange: {
        fontSize: 16,
        color: '#000',
    },
});
