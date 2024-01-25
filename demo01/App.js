import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import Header from './component/Header';
import Product_detail from './component/Product_detail';
import HomeBar from './component/HomeBar';
import Login from './component/Login';
import Cart from './component/Cart';
import { CartProvider } from './CartProvider/CartContext';
import Payment from './component/Payment';
import Search from './component/Search';
import User from './component/User';
import AuthContext from './Auth/AuthContext';
import Register from './component/Resgister';

const Stack = createStackNavigator();

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [showHomeBar, setShowHomeBar] = useState(false);

  const register = (email, password) => {
    setRegisteredUser({ email, password });
  };

  const login = (email, password) => {
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      setShowHomeBar(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    setShowHomeBar(false);
  }, []);

  return (
    <AuthContext.Provider value={{ login, register }}>
      <CartProvider>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header />

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  headerTitle: 'Trang chủ',
                  headerShown: showHomeBar,
                }}
              />
              <Stack.Screen
                name="ProductDetail"
                component={Product_detail}
                options={{ headerTitle: 'Chi tiết sản phẩm' }}
              />
              <Stack.Screen
                name="Cart"
                component={Cart}
              />
              <Stack.Screen
                name="Payment"
                component={Payment}
              />
              <Stack.Screen
                name="Search"
                component={Search}
              />
              <Stack.Screen
                name="User"
                component={User}
              />
              <Stack.Screen
                name="Resgister"
                component={Register}
              />
            </Stack.Navigator>
            {showHomeBar && <HomeBar />}
          </NavigationContainer>
        </View>
      </CartProvider>
    </AuthContext.Provider>
  );
}