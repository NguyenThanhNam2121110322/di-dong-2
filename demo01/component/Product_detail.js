import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CartContext } from '../CartProvider/CartContext';

const Product_detail = () => {
  const { addToCart } = useContext(CartContext);
  const route = useRoute();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    // Kiểm tra giá trị số lượng và đảm bảo nó không nhỏ hơn 1
    const newQuantity = Math.max(parseInt(value), 1);
    setQuantity(newQuantity);
  };

  const handleAddToCartPress = () => {
    addToCart(product);
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating: </Text>
          {Array.from({ length: Math.floor(product.rating.rate) }).map((_, index) => (
            <Text key={index} style={styles.starIcon}>⭐</Text>
          ))}
          <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
        </View>
        <View style={styles.buyContainer}>
          <TextInput
            style={styles.quantityInput}
            value={String(quantity)}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.buyButton} onPress={handleAddToCartPress}>
            <Text style={styles.buyButtonText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    marginRight: 4,
  },
  starIcon: {
    fontSize: 16,
  },
  ratingValue: {
    fontWeight: 'bold',
    marginRight: 2,
  },
  ratingCount: {
    marginLeft: 4,
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Product_detail;