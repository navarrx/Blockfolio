import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { updateUserProfile } from '../api'; 
import { useAuth } from '../context/AuthContext'; 

const ProfileScreen = () => {
  const { user } = useAuth(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || ''); // Establecer nombre inicial
      setEmail(user.email || ''); // Establecer email inicial
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (newPassword && newPassword !== confirmNewPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const updatedData = { name, email };
    
    if (newPassword) {
      updatedData.password = newPassword;
    }

    try {
      const response = await updateUserProfile(updatedData);

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={80} color="#ffab00" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Your Profile</Text>
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
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Update Profile</Text>
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
});

export default ProfileScreen;
 