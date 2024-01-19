import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { CartContext } from '../CartProvider/CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Cart = () => {
  const { updateCartItemCount } = useContext(CartContext);
  const navigation = useNavigation();
  
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);


  const fetchCartItems = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      if (cartItemsData) {
        const parsedCartItems = JSON.parse(cartItemsData);
        setCartItems(parsedCartItems);
        updateCartItemCount(getCartItemCount(parsedCartItems));
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) => 
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          return null;
        }
        return item;
      }).filter(Boolean);

      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      updateCartItemCount(getCartItemCount(updatedCartItems));

    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  const getCartItemCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
               
               

                <Text style={styles.cartItemPrice}>Price: ${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleIncreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleDecreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
              <TouchableOpacity style={styles.removeItemButton} onPress={() => handleRemoveItem(item.id)}>
                <Text>
                  <Icon name="trash" style={styles.removeItemText} />
                </Text>

              </TouchableOpacity>

            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
      )}
      <Text style={styles.totalPrice}>Tổng cộng: ${totalPrice.toFixed(2)}</Text>
      <Button title="Thanh Toán" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
  },
  cartItemQuantity:{
    fontSize: 14,
  },
  removeItemText: {
    fontSize: 25 ,
    color: 'red',
  },
  emptyCartText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
  },
  removeItemButton:{
    paddingLeft: 30,
  },
  quantityButton:{
    backgroundColor: 'white',
    paddingHorizontal: 5,
    alignItems: 'center',
    borderRadius: 30,
  },
  quantityButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 8,
  },

});

export default Cart;