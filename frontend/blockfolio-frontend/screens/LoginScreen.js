import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { handleLogin } from '../api';
import { useAuth } from '../context/AuthContext';
import ProfileButton from '../components/ProfileButton';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const onLoginPress = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }
  
    try {
      const result = await handleLogin(email, password);
      if (result.success) {
        Alert.alert("Success", "Logged in successfully");
        login(result.data);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again");
    }
  };
  
  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={100} color="#ffab00" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.line}></View>
      <Text style={styles.subtitle}>Log in to your account to unlock all the features</Text>
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

      <TouchableOpacity>
        <ProfileButton label="Log In" onPress={onLoginPress} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>Don't have an account? <Text style={styles.switchTextBold}>Sign up</Text></Text>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    color: 'darkgray',
    marginBottom: 24,
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8,
    width: '40%',
    marginTop: 8,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderColor: '#333',  // Darker border to match the theme
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1e',  // Dark input background
    color: '#FFFFFF',  // White text inside inputs
  },
  button: {
    backgroundColor: '#ffab00',  // Blue color for the login button
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
    color: '#888',  // Light grey text for switch text
  },
  switchTextBold: {
    color: '#ffab00',  // Accent color matching HomeScreen
    fontWeight: 'bold',
  },
});

export default LoginScreen;
