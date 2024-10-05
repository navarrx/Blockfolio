import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tab = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <View style={styles.tabContainer}>
            {tabs.map((tab) => (
                <TouchableOpacity 
                    key={tab.key} 
                    onPress={() => setActiveTab(tab.key)} 
                    style={[styles.tabButton, activeTab === tab.key && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default Tab;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        width: '100%',
    },
    tabButton: {
        padding: 10,
        marginBottom: 7,
        borderRadius: 10,
        backgroundColor: '#282c34',
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#282c34',
        borderBottomWidth: 2,
        borderBottomColor: '#ffab00',
    },
    tabText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#ffab00',
    },
});
