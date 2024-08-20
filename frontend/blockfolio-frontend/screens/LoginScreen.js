import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password
            });
            if (response.status === 200) {
                // Navigate to HomeScreen
                navigation.navigate('Home');
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default LoginScreen;
