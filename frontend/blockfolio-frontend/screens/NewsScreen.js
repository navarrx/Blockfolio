import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { fetchCryptoNews } from '../api';
import { FlashList } from '@shopify/flash-list';
import NewsCard from '../components/NewsCard';

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchNews = async () => {
        try {
            const response = await fetchCryptoNews();
            setNews(response);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchNews();
        setRefreshing(false);
    };

    const renderItem = ({ item }) => (
        <NewsCard
            title={item.title}
            imageUrl={item.imageurl}
            url={item.url}
            body={item.body}
            publishedOn={item.published_on * 1000}
        />
    );

    return (
        <View style={styles.listContainer}>
            <Text style={styles.title}>Latest Crypto News</Text>
            <View style={styles.line} />
            {loading ? (
                <ActivityIndicator size="large" color="#FFF" />
            ) : (
                <FlashList
                    data={news}
                    contentContainerStyle={styles.flashListContent}
                    renderItem={renderItem}
                    estimatedItemSize={100}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor="black"
                            colors={['black']}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
    },
    line: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.5,
        width: '90%',
        marginTop: 8,
        marginBottom: 14,
        alignSelf: 'center',
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

export default NewsScreen;