import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

export default function Cart({ route }) {
  const { cartItems } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image style={styles.productImage} source={{ uri: item.image }} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>Price: ${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text> {/* Thêm dòng này để hiển thị số lượng */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Page</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cartList}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  cartList: {
    flexGrow: 1,
    marginTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    marginTop: 8,
  },
  quantity: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  checkoutButton: {
    backgroundColor: '#0066cc',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});