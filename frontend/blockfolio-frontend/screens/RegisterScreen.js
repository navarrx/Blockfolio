import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../api'; // Importamos la función desde api.js
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(name, email, password);

      if (response.status === 201) {
        Alert.alert("Success", "Account created successfully");
        navigation.navigate('Login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", error.response.data.message || "User already exists");
      } else {
        Alert.alert("Error", "Something went wrong, please try again");
      }
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-plus" size={80} color="#ffab00" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Take control of your assets and track their prices live!</Text>
      <View style={styles.line}></View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? <Text style={styles.switchTextBold}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#0c0c0c',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8,
    width: '40%',
    marginTop: 8,
    marginBottom: 25,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1e',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#ffab00',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  switchText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
  switchTextBold: {
    color: '#ffab00',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
