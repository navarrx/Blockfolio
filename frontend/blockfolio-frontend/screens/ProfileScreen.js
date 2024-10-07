import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateUserProfile } from '../api'; 
import { useAuth } from '../context/AuthContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ProfileButton from '../components/ProfileButton';
import LogoutButton from '../components/LogoutButton';

const ProfileScreen = () => {
  const { user, logout } = useAuth(); 
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (newPassword === '' || confirmNewPassword === '') {
      Alert.alert("Error", "Please fill in both password fields");
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    const updatedData = { name, email };
  
    if (newPassword) {
      updatedData.password = newPassword;
    }
  
    try {
      const response = await updateUserProfile(updatedData);
      if (response) {
        Alert.alert("Success", "Profile updated successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate('HomeScreen'), // Navegar a HomeScreen
          },
        ]);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };  
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => logout() },
      ],
      { cancelable: false }
    )
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name="user-circle" size={80} color="#ffab00" style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Text style={styles.title}>Profile Details</Text>
      <View style={styles.line}></View>
      <Text style={styles.readOnlyText}>{name}</Text>
      <Text style={styles.readOnlyText}>{email}</Text>
      
      <Text style={styles.subtitle}>Do you want to modify your password?</Text>

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
      <TouchableOpacity>
        <ProfileButton label="Update Profile" onPress={handleUpdateProfile} />
      </TouchableOpacity>
      <LogoutButton onPress={handleLogout} />
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
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
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
  readOnlyText: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#1c1c1e',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
});

export default ProfileScreen;
