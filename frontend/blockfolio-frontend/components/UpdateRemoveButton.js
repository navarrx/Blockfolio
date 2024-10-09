import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const UpdateRemoveButton = ({ label, onPress, color, textColor }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdateRemoveButton;