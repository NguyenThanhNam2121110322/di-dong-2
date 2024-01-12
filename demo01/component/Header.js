import React from 'react';
import { StyleSheet, Image, Text, View, TextInput } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo2.jpg')} style={styles.logo} />
      </View>
      <View style={styles.searchContainer}>
        <Text style={styles.searchInput}>NTN Shop</Text>
        {/* <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          // Add your search functionality here
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 50,
  },
  searchContainer: {
    flex: 2,
    marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    fontSize:25,
    height: 30,
    backgroundColor: '#fff',
  },
});