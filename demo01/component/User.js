import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const value = await AsyncStorage.getItem('isLoggedIn');
          const storedEmail = await AsyncStorage.getItem('email');
          const storedPassword = await AsyncStorage.getItem('password');
  
          if (value === 'true' && storedEmail && storedPassword) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            setPassword(storedPassword);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      checkLoginStatus();
    }, []);
  

  return (
    <View style={styles.footerContainer}>
    <Text style={styles.footerText}>Trang nguoi dung</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
      },
      footerText: {
        fontSize: 14,
        textAlign: 'center',
      },
});
